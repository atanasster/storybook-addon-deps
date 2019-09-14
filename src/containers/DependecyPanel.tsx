import React from 'react';
import { Consumer, Combo, API } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { IDepencency } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryInput } from '../types';
import { DependencyTree } from '../components/DependencyTree';


const mapper = ({ state }: Combo): { story?: StoryInput, module?: IDepencency } => {
  const story = state.storiesHash[state.storyId] as StoryInput;
  if (story && story.parameters.component && story.parameters.dependencies && story.parameters.dependencies.mapper) {   
    const dependenciesMap = JSON.parse(story.parameters.dependencies.mapper);
    const module = Object.keys(dependenciesMap).find(resource => resource.indexOf(story.parameters.component.name) > -1);
    console.log(story)
    return { story, module: dependenciesMap[module] };
  }  
  return { story: null, module: null };
};

interface DependencyPanelProps {
  active: boolean,
  api: API, 
}

export const DependencyPanel = ({ active }: DependencyPanelProps) => (
  <AddonPanel active={active}>
    <Consumer filter={mapper}>
    {({ story, module }: ReturnType<typeof mapper>) => (
        <DependencyTree module={module} story={story} />
    )}
    </Consumer>
  </AddonPanel>
);

