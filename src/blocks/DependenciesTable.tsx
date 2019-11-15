import React from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { getDependenciesProps, IDependenciesProps } from '../shared/utils';
import { ModulesTable } from './ModulesTable';



const DependenciesTable: React.FunctionComponent<IDependenciesProps> = props => (
  <DocsContext.Consumer>
    {context => {
      const tableProps = getDependenciesProps(props, context);
      return <ModulesTable {...tableProps} />;
    }}
  </DocsContext.Consumer>
);

export { DependenciesTable as Dependencies };