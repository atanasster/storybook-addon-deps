import React from 'react';
import { Consumer, Combo, API } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import memoize from 'memoizerific';
import { StoryInput } from '../types';
import { DependencyTree } from '../components/DependencyTree';

const getDependencyMap = memoize(1)((mapper) => mapper ? JSON.parse(mapper) : undefined);


const mapper = ({ state }: Combo): { story?: StoryInput, map?: IDependenciesMap } => {
  const story = state.storiesHash[state.storyId] as StoryInput;
  return { story, map: getDependencyMap(story && story.parameters.dependencies && story.parameters.dependencies.mapper) };
};

interface DependencyPanelProps {
  active: boolean,
  api: API, 
}

export const DependencyPanel = ({ active }: DependencyPanelProps) => (
  <AddonPanel active={active}>
    <Consumer filter={mapper}>
    {({ story, map }: ReturnType<typeof mapper>) => (
        <DependencyTree map={map} story={story} />
    )}
    </Consumer>
  </AddonPanel>
);

