import React from 'react';
import { IModuleWithStory } from '../shared/utils';
import { ModuleName } from '../shared/ModuleName';
import { StyledLight, StyledSmallLight } from '../shared/Labels';

interface ModuleRowProps {
  module: IModuleWithStory;
}


export const ModuleRow: React.FunctionComponent<ModuleRowProps> = ({ module }) => {
  const { id, request, contextPath, story } = module;
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
  );
};
