import React from 'react';
import { Consumer, Combo, API } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryInput } from '../types';
import { DependencyTree } from '../components/DependencyTree';
import { getDependencyMap } from '../shared/jsonToMap';

const mapper = ({ state }: Combo): { story?: StoryInput, map?: IDependenciesMap } => {
  const story = state.storiesHash[state.storyId] as StoryInput;
  return { story, map: getDependencyMap(story && story.parameters.dependencies && story.parameters.dependencies.mapper) };
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
      {({ story, map }: ReturnType<typeof mapper>) => (
          <DependencyTree map={map} story={story} />
      )}
      </Consumer>
    </AddonPanel>
  );
}  

