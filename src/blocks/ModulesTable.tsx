import React from 'react';
import { styled } from '@storybook/theming';
import { Table } from '@storybook/components';
import { EmptyBlock } from '@storybook/components/dist/blocks/EmptyBlock';
import { ResetWrapper } from '@storybook/components/dist/typography/DocumentFormatting';
import { ModuleRow } from './ModuleRow';
import { IModulesTableProps } from '../shared/depUtils';



export const DepTable = styled(Table)<{}>(() => ({
  '&&': {
    'th:last-of-type, td:last-of-type': {
      width: '70%',
    },

  },
}));

export const ModulesTable: React.FunctionComponent<IModulesTableProps> = props => {
  const { modules } = props;
  if (!modules) {
    return <EmptyBlock>No dependencies found for this component</EmptyBlock>;
  }
  return (
    <ResetWrapper>
      <DepTable className="docblock-dependenciestable">
        <thead>
          <tr>
            <th>name</th>
            <th>path</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(module => <ModuleRow key={module.request} module={module} />)}
        </tbody>
      </DepTable>
    </ResetWrapper>
  );
};
