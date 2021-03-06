import { IDependenciesMap, IDependency } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryStore } from '@storybook/client-api';
import { DocsContextProps, Component, CURRENT_SELECTION } from '@storybook/addon-docs/blocks';
import { getDependencyMap } from 'storybook-dep-webpack-plugin/runtime/main';

const memoize = require('memoizerific');
import { dependencyError } from './getDependencyError';
import { IDependenciesParameters, StoryInput } from '../types';

export interface ComponentType {
  name?: string;
  __docgenInfo?: {
    displayName?: string,    
  }
}

type ComponentDependenciesFunction = (map?: IDependenciesMap, component?: ComponentType, parameters?: IDependenciesParameters) => IDependency;

const titleCase = (str: string): string => str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

export const getComponentName = (component?: ComponentType | string): string | undefined => {
  if (!component) {
    return undefined;
  } 

  if (typeof component === 'string') {
    const wc = customElements.get(component);
    if (wc && wc.name) {
      return wc.name; 
    }
    if (component.includes('-')) {
      return titleCase(component);
    }
    return component;
  }
  //
  if (component.__docgenInfo && component.__docgenInfo.displayName) {
    return component.__docgenInfo.displayName;
  }

  return component.name;
}  

export const findComponentDependencies: ComponentDependenciesFunction = memoize(20)((map, component, parameters) => {
  const storyFilename = parameters.fileName;
  const match = parameters.dependencies.match ?? ((m) => m?.[0][0])
  const { mapper } = map;
  if (mapper && component) {
    const componentName = getComponentName(component);
    // console.log('componentName', component, Object.keys(mapper).filter(key => mapper[key].id).map(key => mapper[key]));
    if (componentName) {
      
      const key = match(Object.entries(mapper).filter(([key]) => mapper[key].id === componentName || mapper[key].name === componentName), storyFilename);
      if (key) {
        let module = mapper[key];
        module.key = key;
        if (module && module.dependencies) {
          const componentModule = module.dependencies.find(key => key.indexOf(componentName) > -1 && ((mapper[key] as unknown) as IDependency).dependencies);
          
          if (componentModule && mapper[componentModule] && ((mapper[componentModule] as unknown) as IDependency).dependencies) { 
            module = mapper[componentModule];
            module.key = componentModule;
          }
          return module;
        }
      }  
    }  
    return undefined;
  }
});

export type excudeFunctionType = (module: IDependency) => boolean;
export interface IDependenciesProps {
  excludeFn?: excudeFunctionType;
  of?: '.' | Component;
  title?: string;
}

export type IDependenciesTableProps = IDependenciesProps & {
  dependents?: boolean; 
}

export type IModuleWithStory = IDependency & { story?: StoryInput};

export const mapModuleToStory = (modules: IDependency[], storyStore: StoryStore, parameters: IDependenciesParameters = {}): IModuleWithStory[] => {
  if (modules) {
    
    const result = modules.map(module => {
      const store = getStoreStories(storyStore);
      const storyName = module.name && store
      && Object.keys(store).find(storyname => {
        const { parameters = {}, component, kind } = store[storyname];
        const document = storyStore._kinds[kind];
        const { parameters: kindParameters = {} } = document || {};
        const componentName = getComponentName(component || parameters.component || kindParameters.component);
        return componentName && componentName === module.name;
      });
      const story = storyName ? store[storyName] : undefined;
      return { ...module, story };
    });
    if (parameters.withStoriesOnly) {
      return result.filter(m => m.story);
    }
    return result;
  }
  return undefined;
}

export const getComponentStories = (component: string, storyStore: StoryStore) => {
  const store = getStoreStories(storyStore);
  return store && Object.keys(store).filter(storyname => {
      const parameters = store[storyname].parameters;
      const componentName = getComponentName(parameters && parameters.component);
      return componentName && componentName === component;
    });
}    


export interface IModulesTableProps {
  modules?: IModuleWithStory[];
  module?: IDependency;
  error?: string;
  hideEmpty?: boolean;
  title?: string;
  dependents?: boolean;
}



export const getDependenciesProps = (
  { excludeFn, of = CURRENT_SELECTION, dependents }: IDependenciesTableProps,
  { parameters = {}, storyStore }: DocsContextProps,
  defaultMap?: IDependenciesMap,
): IModulesTableProps => {
  const { component, dependencies: dependenciesParam = {}} = parameters;
  let target = of === CURRENT_SELECTION ? component : of;
  const map = defaultMap || getDependencyMap();
  const error = dependencyError({
    map,
    component: target,
  })
  if (error) {
    return {
      error,
      hideEmpty: dependenciesParam.hideEmpty,
    }
  }
  
  const noDepError = `No ${dependents ? 'dependents' : 'dependencies'} found for this component`;
  const module: IDependency = findComponentDependencies(map, target, parameters);
  if (!module) {
    return { error: noDepError, hideEmpty: dependenciesParam.hideEmpty,}
  }
  const { mapper } = map;
  let modules: IModuleWithStory[] = [];
  const mapKeys = Object.keys(mapper);  
  if (dependents ) {
    modules = mapKeys
      .filter(key => mapper[key].id && mapper[key].dependencies && mapper[key].dependencies.includes(module['key']))
      .map(key => mapper[key]);
    if (target) {
      const targetName = getComponentName(target);
      Object.keys(storyStore._stories).forEach(key => {
        const story = storyStore._stories[key];
        const kind = storyStore._kinds[story.kind];
        const component = story.parameters?.component || story.component || kind.parameters?.component || kind.component;
        if (component && typeof component.components === 'object') {
          Object.keys(component.components).forEach(name => {
            if (name === targetName) {
              const componentName = getComponentName(component);
              if (!modules.find(m => m.name === componentName)) {
                const module = mapKeys.find(key => mapper[key].name === componentName);
                if (module) {
                  modules.push(mapper[module]);
                }
              }  
            }
          });
          
        }
      })
    }  
  } else {
    if (module.dependencies) {
      modules = module.dependencies.map(key => mapper[key]);
    }
    if (target && typeof target.components === 'object') {
      Object.keys(target.components).forEach(name => {
        if (!modules.find(m => m.name === name)) {
          const module = mapKeys.find(key => mapper[key].name === name);
          if (module) {
            modules.push(mapper[module]);
          }
        }  
      })
    }
  }

  modules = mapModuleToStory(modules, storyStore, dependenciesParam);
  if (modules && excludeFn) {
    modules = modules.filter(module => !excludeFn(module));
  }
  return { 
    modules,
    module,
    dependents,
    hideEmpty: dependenciesParam.hideEmpty,
    error: modules.length > 0 ? undefined : noDepError,
   };
};

//@ts-ignore
export const getStoreStories = (store: StoryStore) => store._stories || store._data;