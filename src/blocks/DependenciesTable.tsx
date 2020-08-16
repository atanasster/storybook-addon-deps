import React from 'react';
import { DocsContext } from '../shared/DocsBlocks';
import { getDependenciesProps, IDependenciesProps, IModulesTableProps } from '../shared/utils';
import { TableWrapper } from './TableWrapper';
import { ModulesTable } from './ModulesTable';

interface ITitleProps {
  titleDependencies?: string;
  titleDependents?: string;
}
export const DependenciesTable: React.FunctionComponent<IDependenciesProps & ITitleProps> = (
  { children, titleDependencies, titleDependents, ...props }
) => (
  <DocsContext.Consumer>
    {context => {
      const isEmpty = (prop: IModulesTableProps) => (prop.error || (!prop.modules || prop.modules.length === 0));
      const dependenciesProps = getDependenciesProps(props, context);
      const dependentsProps = getDependenciesProps({...props, dependents: true }, context);
      console.log(isEmpty, dependenciesProps, dependentsProps)
      const { hideEmpty } = dependenciesProps;
      if (hideEmpty && isEmpty(dependenciesProps) && isEmpty(dependentsProps)) {
        return null;
      } 
      return (
        <TableWrapper>
          <ModulesTable title={titleDependencies} {...dependenciesProps} children={children}/>
          <ModulesTable title={titleDependents} {...dependentsProps} children={children}/>
        </TableWrapper>  
      );  
    }}
  </DocsContext.Consumer>
);

