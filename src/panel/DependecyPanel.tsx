import React from 'react';
import { Consumer, Combo, API } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import { EVENTS } from '../constants';
import { useAddonState, useChannel } from '@storybook/api';
import { ADDON_ID } from '../constants';  
import { StoryInput } from '../types';
import { DependencyTree } from './DependencyTree';

const mapper = ({ state }: Combo): { story?: StoryInput, map?: IDependenciesMap, storyStore?: any } => {
  const story = state.storiesHash[state.storyId] as StoryInput;
  return {
    story,
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
  const [map, setState] = useAddonState<IDependenciesMap>(ADDON_ID, null);
  const emit = useChannel({
    [EVENTS.RESULT]: (newMap: IDependenciesMap) => {
      setState(newMap);
    },  
  });
  if (map === null) {
    emit(EVENTS.REQUEST);
  };
  return (
    <AddonPanel active={active}>
      <Consumer filter={mapper}>
      {({ story, storyStore }: ReturnType<typeof mapper>) => (
          <DependencyTree story={story} storyStore={storyStore} map={map} />
      )}
      </Consumer>
    </AddonPanel>
  );
}  

