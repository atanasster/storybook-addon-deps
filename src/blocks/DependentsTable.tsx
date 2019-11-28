import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { getDependenciesProps, IDependenciesProps } from '../shared/utils';
import { ModulesTable } from './ModulesTable';



const DependentsTable: React.FunctionComponent<IDependenciesProps> = ({ children, ...props }) => (
  <DocsContext.Consumer>
    {context => {
      const tableProps = getDependenciesProps({...props, dependents: true }, context);
      return <ModulesTable {...tableProps} children={children} />;
    }}
  </DocsContext.Consumer>
);

export { DependentsTable as Dependents };