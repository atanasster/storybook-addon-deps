import React, { FunctionComponent } from 'react';
import { parseKind } from '@storybook/router';
import { DocsPage as PureDocsPage, PropsTable } from '@storybook/components';
import { H2, H3 } from '@storybook/components/html';
import { DocsContext, Description, Story, Preview, getPropsTableProps, Anchor,
  StringSlot, PropsSlot, StorySlot, StoriesSlot, DocsPageProps, DocsStoryProps } from '@storybook/addon-docs/blocks';
import { getDependenciesProps } from '../shared/depUtils';
import { ModulesTable } from './ModulesTable';

const defaultTitleSlot: StringSlot = ({ selectedKind, parameters }) => {
  const {
    hierarchyRootSeparator: rootSeparator,
    hierarchySeparator: groupSeparator,
  } = (parameters && parameters.options) || {
    hierarchyRootSeparator: '|',
    hierarchySeparator: /\/|\./,
  };
  const { groups } = parseKind(selectedKind, { rootSeparator, groupSeparator });
  return (groups && groups[groups.length - 1]) || selectedKind;
};

const defaultSubtitleSlot: StringSlot = ({ parameters }) =>
  parameters && parameters.componentSubtitle;

const defaultPropsSlot: PropsSlot = context => getPropsTableProps({ of: '.' }, context);

const defaultDescriptionSlot: StringSlot = ({ parameters }) => {
  const { component, docs } = parameters;
  if (!component) {
    return null;
  }
  const { extractComponentDescription } = docs || {};
  return extractComponentDescription && extractComponentDescription(component, parameters);
};

const defaultPrimarySlot: StorySlot = stories => stories && stories[0];
const defaultStoriesSlot: StoriesSlot = stories => {
  if (stories && stories.length > 1) {
    //@ts-ignore
    const [first, ...rest] = stories;
    return rest;
  }
  return null;
};

const StoriesHeading = H2;
const StoryHeading = H3;

const DocsStory: FunctionComponent<DocsStoryProps> = ({
  id,
  name,
  expanded = true,
  withToolbar = false,
  parameters,
}) => (
  <Anchor storyId={id}>
    {expanded && <StoryHeading>{(parameters && parameters.displayName) || name}</StoryHeading>}
    {expanded && parameters && parameters.docs && parameters.docs.storyDescription && (
      <Description markdown={parameters.docs.storyDescription} />
    )}
    <Preview withToolbar={withToolbar}>
      <Story id={id} />
    </Preview>
  </Anchor>
);

export const DocsPage: React.FunctionComponent<DocsPageProps> = ({
  titleSlot = defaultTitleSlot,
  subtitleSlot = defaultSubtitleSlot,
  descriptionSlot = defaultDescriptionSlot,
  primarySlot = defaultPrimarySlot,
  propsSlot = defaultPropsSlot,
  storiesSlot = defaultStoriesSlot,
}) => (
  <DocsContext.Consumer>
    {context => {
      const title = titleSlot(context) || '';
      const subtitle = subtitleSlot(context) || '';
      const description = descriptionSlot(context) || '';
      const propsTableProps = propsSlot(context);

      const { selectedKind, storyStore } = context;
      const componentStories = storyStore
      .getStoriesForKind(selectedKind)
      .filter((s: any) => !(s.parameters && s.parameters.docs && s.parameters.docs.disable));
      const primary = primarySlot(componentStories, context);
      const stories = storiesSlot(componentStories, context);
      const dependencyModules = getDependenciesProps({}, context);
      const dependentModules = getDependenciesProps({ dependents: true }, context);
      return (
        <PureDocsPage title={title} subtitle={subtitle}>
          <Description markdown={description} />
          {primary && <DocsStory key={primary.id} {...primary} expanded={false} withToolbar />}
          {propsTableProps && <PropsTable {...propsTableProps} />}
          <H2>Dependencies</H2>
          <ModulesTable
            {...dependencyModules}
          />
          <H2>Dependents</H2>
          <ModulesTable
            {...dependentModules}
          />
          {stories && stories.length > 0 && <StoriesHeading>Stories</StoriesHeading>}
          {stories &&
            stories.map(story => story && <DocsStory key={story.id} {...story} expanded />)}
        </PureDocsPage>
      );
    }}
  </DocsContext.Consumer>
);
