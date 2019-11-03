import memoize from 'memoizerific';
import { IDependenciesMap, IDepencency } from 'storybook-dep-webpack-plugin/runtime/types';

type DependencyStringifyFunction = (mapper: string) => IDependenciesMap;

export const getDependencyMap: DependencyStringifyFunction = memoize(1)((mapper) => mapper ? JSON.parse(mapper) : undefined);

export interface ComponentType {
  name?: string;
}

type ComponentDependenciesFunction = (map?: IDependenciesMap, component?: ComponentType, storyDependencies?: boolean) => IDepencency;


export const findComponentDependencies: ComponentDependenciesFunction = memoize(20)((map, component, storyDependencies) => {
  const { mapper } = map;
  if (mapper && component) {
    const key = Object.keys(mapper).find(key => mapper[key].id === component.name);
    let module = mapper[key];
    if (module) {
      const componentModule = storyDependencies ?
        null : module.dependencies.find(key => key.indexOf(component.name) > -1 && ((mapper[key] as unknown) as IDepencency).dependencies);
      
      if (componentModule && mapper[componentModule] && ((mapper[componentModule] as unknown) as IDepencency).dependencies) { 
        module = mapper[componentModule];
      }
      return module;
    }
    return undefined;
  }
});