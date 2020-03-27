import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { IDependency } from 'storybook-dep-webpack-plugin/runtime/types';
import { ModuleName } from '../shared/ModuleName';
import { getComponentName, getStoreStories } from '../shared/utils';
import { StyledLight, StyledSmallLight } from '../shared/Labels';

interface ModuleRowProps {
  module: IDependency;
}


export const ModuleRow: React.FunctionComponent<ModuleRowProps> = ({ module }) => (
  <DocsContext.Consumer>
    {context => {
      const { name, id, request, contextPath } = module;
      const store = context ? getStoreStories(context.storyStore) : undefined;
      const storyName = name && store
       && Object.keys(store).find(storyname => {
         const parameters = store[storyname].parameters;
         const componentName = getComponentName(parameters && parameters.component);
         return componentName && componentName === name;
        });
      const story = storyName ? store[storyName] : undefined;
      return (
        <tr>
          <td>
            <ModuleName story={story} module={module} />
            {id && !request.includes('/') && <StyledSmallLight>{request}</StyledSmallLight>}
          </td>
          <td>
            <StyledLight>{contextPath}</StyledLight>
          </td>
        </tr>
      )}
    }  
  </DocsContext.Consumer>
);
