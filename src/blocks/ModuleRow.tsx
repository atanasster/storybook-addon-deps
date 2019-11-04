import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { IDependency } from 'storybook-dep-webpack-plugin/runtime/types';
import { ModuleName } from '../shared/ModuleName';
import { StyledLight, StyledSmallLight } from '../shared/Labels';

interface ModuleRowProps {
  module: IDependency;
}


export const ModuleRow: React.FunctionComponent<ModuleRowProps> = ({ module }) => (
  <DocsContext.Consumer>
    {context => {
      const { name, id, request, contextPath } = module;
      const storyName = name && context && context.storyStore && context.storyStore._data
       && Object.keys(context.storyStore._data).find(storyname => {
         const parameters = context.storyStore._data[storyname].parameters;
         return parameters && parameters.component  && parameters.component.name === name;
        });
      const story = storyName ? context.storyStore._data[storyName] : undefined;
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
