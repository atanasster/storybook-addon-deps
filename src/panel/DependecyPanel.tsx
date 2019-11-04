import React from 'react';
import { Consumer, Combo, API } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryInput } from '../types';
import { DependencyTree } from './DependencyTree';
import { getDependencyMap } from '../shared/depUtils';

const mapper = ({ state }: Combo): { story?: StoryInput, map?: IDependenciesMap, storyStore?: any } => {
  const story = state.storiesHash[state.storyId] as StoryInput;
  return {
    story,
    map: getDependencyMap(story && story.parameters.dependencies && story.parameters.dependencies.mapper),
    storyStore: state.storiesHash,
  };
};

interface DependencyPanelProps {
  active: boolean,
  api: API, 
}

export const DependencyPanel = ({ active }: DependencyPanelProps) => {
  if (!active) {
    return null;
  }
  return (
    <AddonPanel active={active}>
      <Consumer filter={mapper}>
      {({ story, map, storyStore }: ReturnType<typeof mapper>) => (
          <DependencyTree map={map} story={story} storyStore={storyStore} />
      )}
      </Consumer>
    </AddonPanel>
  );
}  

