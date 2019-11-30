import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { getDependenciesProps, IDependenciesProps } from '../shared/utils';
import { TableWrapper } from './TableWrapper';
import { ModulesTable } from './ModulesTable';

export const Dependents: React.FunctionComponent<IDependenciesProps> = ({ children, title, ...props }) => (
  <DocsContext.Consumer>
    {context => {
      const tableProps = getDependenciesProps({...props, dependents: true }, context);
      return (
        <TableWrapper>
          <ModulesTable title={title} {...tableProps} children={children} />
        </TableWrapper>  
      );  
    }}
  </DocsContext.Consumer>
);
