import React, { FunctionComponent } from 'react';
import { Title, Subtitle, Primary, Stories, Props, Description, Heading, DocsPageProps } from '@storybook/addon-docs/blocks';
import { Dependencies } from './DependenciesTable';
import { Dependents } from './DependentsTable';

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
      <Dependencies>
        <Heading>Dependencies</Heading>
      </Dependencies>  
      <Dependents>
        <Heading>Dependents</Heading>
      </Dependents>  
      <Stories slot={storiesSlot} />
    </>
  );
};
