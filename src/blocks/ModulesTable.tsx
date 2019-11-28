import React from 'react';
import { styled } from '@storybook/theming';
import { Table, Description } from '@storybook/components';
import { EmptyBlock } from '@storybook/components/dist/blocks/EmptyBlock';
import { ResetWrapper } from '@storybook/components/dist/typography/DocumentFormatting';
import { ModuleRow } from './ModuleRow';
import { IModulesTableProps } from '../shared/utils';



export const DepTable = styled(Table)<{}>(() => ({
  '&&': {
    'th:last-of-type, td:last-of-type': {
      width: '70%',
    },

  },
}));

export const ModulesTable: React.FunctionComponent<IModulesTableProps> = props => {
  const { modules, error, hideEmpty } = props;
  const WithChildren = ({ children }) => (
    <>
      {props.children}
      {children}
    </>  
  )
  if (error) {
    if (hideEmpty) {
      return null;
    }
    return (
      <WithChildren>
        <EmptyBlock>
          <Description markdown={error} />
        </EmptyBlock>
      </WithChildren>  
    );
  }
  if (!modules || modules.length === 0) {
    if (hideEmpty) {
      return null;
    }
    return <WithChildren><EmptyBlock>No dependencies found for this component</EmptyBlock></WithChildren>;
  }
  return (
    <WithChildren>
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
    </WithChildren>  
  );
};
