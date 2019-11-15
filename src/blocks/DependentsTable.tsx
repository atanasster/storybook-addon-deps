import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { getDependenciesProps, IDependenciesProps } from '../shared/utils';
import { ModulesTable } from './ModulesTable';



const DependentsTable: React.FunctionComponent<IDependenciesProps> = props => (
  <DocsContext.Consumer>
    {context => {
      const tableProps = getDependenciesProps({...props, dependents: true }, context);
      return <ModulesTable {...tableProps} />;
    }}
  </DocsContext.Consumer>
);

export { DependentsTable as Dependents };