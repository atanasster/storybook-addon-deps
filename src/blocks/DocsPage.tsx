import React, { FC } from 'react';
import { Title, Subtitle, Primary, Stories, ArgsTable, Description } from '../shared/DocsBlocks';
import { DependenciesTable } from './DependenciesTable';

export const DocsPage: FC = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <ArgsTable />
      <DependenciesTable titleDependencies='Dependencies' titleDependents='Dependents' />
      <Stories />
    </>
  );
};
