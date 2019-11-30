import React, { FunctionComponent } from 'react';
import { Title, Subtitle, Primary, Stories, Props, Description, DocsPageProps } from '@storybook/addon-docs/blocks';
import { DependenciesTable } from './DependenciesTable';

export const DocsPage: FunctionComponent<DocsPageProps> = ({
  titleSlot,
  subtitleSlot,
  descriptionSlot,
  primarySlot,
  propsSlot,
  storiesSlot,
}) => {
  return (
    <>
      <Title slot={titleSlot} />
      <Subtitle slot={subtitleSlot} />
      <Description slot={descriptionSlot} />
      <Primary slot={primarySlot} />
      <Props slot={propsSlot} />
      <DependenciesTable titleDependencies='Dependencies' titleDependents='Dependents' />
      <Stories slot={storiesSlot} />
    </>
  );
};
