import React from 'react';

import { parseKind } from '@storybook/router';
import { DocsPage as PureDocsPage, PropsTable } from '@storybook/components';
import { H2, H3 } from '@storybook/components/html';
import { DocsContext, Description, getDocgen, Story, Preview, getPropsTableProps,
  StringSlot, PropsSlot, StorySlot, StoriesSlot, DocsPageProps, DocsStoryProps } from '@storybook/addon-docs/blocks';
import { DependenciesTable } from './DependenciesTable';

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

const defaultDescriptionSlot: StringSlot = ({ parameters }) =>
  parameters && getDocgen(parameters.component);

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

const DocsStory: React.FunctionComponent<DocsStoryProps> = ({
  id,
  name,
  description,
  expanded = true,
  withToolbar = false,
  parameters,
}) => (
  <>
    {expanded && <StoryHeading>{(parameters && parameters.displayName) || name}</StoryHeading>}
    {expanded && description && <Description markdown={description} />}
    <Preview withToolbar={withToolbar}>
      <Story id={id} />
    </Preview>
  </>
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

      const { selectedKind, storyStore, parameters } = context;
      const componentStories = storyStore.getStoriesForKind(selectedKind);
      const primary = primarySlot(componentStories, context);
      const stories = storiesSlot(componentStories, context);

      return (
        <PureDocsPage title={title} subtitle={subtitle}>
          <Description markdown={description} />
          {primary && <DocsStory key={primary.id} {...primary} expanded={false} withToolbar />}
          {propsTableProps && <PropsTable {...propsTableProps} />}
          {parameters && parameters.dependencies && parameters.dependencies.mapper && (
            <>
              <H2>Dependencies</H2>
              <DependenciesTable
                jsonMap={parameters.dependencies.mapper}
                storyDependencies={parameters.dependencies.storyDependencies}
                component={parameters.component}
              />
            </>  
          )}
          {stories && stories.length > 0 && <StoriesHeading>Stories</StoriesHeading>}
          {stories &&
            stories.map(story => story && <DocsStory key={story.id} {...story} expanded />)}
        </PureDocsPage>
      );
    }}
  </DocsContext.Consumer>
);
