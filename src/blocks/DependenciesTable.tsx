import React from 'react';
import { styled } from '@storybook/theming';
import { PropDef, Table } from '@storybook/components';
import { EmptyBlock } from '@storybook/components/dist/blocks/EmptyBlock';
import { ResetWrapper } from '@storybook/components/dist/typography/DocumentFormatting';
import { IDepencency } from 'storybook-dep-webpack-plugin/runtime/types';
import { DependencyRow } from './DependencyRow';
import { getDependencyMap, findComponentDependencies, ComponentType } from '../shared/jsonToMap';



export const DepTable = styled(Table)<{}>(() => ({
  '&&': {
    'th:last-of-type, td:last-of-type': {
      width: '70%',
    },

  },
}));

interface DependenciesTableProps {
  jsonMap: string,
  storyDependencies?: boolean,
  component: ComponentType
}
/**
 * Display the props for a component as a props table. Each row is a collection of
 * PropDefs, usually derived from docgen info for the component.
 */
const DependenciesTable: React.FunctionComponent<DependenciesTableProps> = props => {
  const { jsonMap, component, storyDependencies } = props;
  const map = getDependencyMap(jsonMap);
  const module: IDepencency = findComponentDependencies(map, component, storyDependencies);
  if (!module || !module.dependencies || module.dependencies.length === 0) {
    return <EmptyBlock>No dependencies found for this component</EmptyBlock>;
  }
  const dependencies = module.dependencies;
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
          {dependencies.map(row => {
            const dependency = map.mapper[row];
            return (
              <DependencyRow key={row} dependency={dependency} />
            )}
          )}
        </tbody>
      </DepTable>
    </ResetWrapper>
  );
};

export { DependenciesTable, PropDef };
