import React from 'react';
import { Link } from  '@storybook/components';
import { styled } from '@storybook/theming';
import { useStorybookApi } from '@storybook/api';
import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { IDependency } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryInput } from '../types';


interface ModuleNameProps {
  story: StoryInput;
  module: IDependency;
}

export const nameAsString = (module: IDependency) => {
  const { id, request, name } = module;
  return id === name ? (id || request) : name;
}
const Bold = styled.span({ fontWeight: 'bold' });

export const ModuleName = ({ story, module }: ModuleNameProps ) => {
  const importID = <Bold>{nameAsString(module)}</Bold>;
  if (story) {
    const api = useStorybookApi();
    const extractStory = () => {
      if (story.id) {
        // SELECT_STORY does not work with overriden story names
        // example - in this case story.story will be 'default' while the URL is default-story
        // export const defaultStory = () => <Button />;
        // defaultStory.story = {
        //   name: 'default',
        // };
        const storyName = story.id.split('--');
        if (storyName.length > 1) {
          return {
            kind: story.kind,
            story: storyName[1],
          }
        }
      }  
      return story;  
    };
    // docs pages do not have an API context
    // TAB pages do not work with getChannel
    // little hack to work both as a TAB and a Docs block
    return (      
      <Link href={`/?path=/docs/${story.id}`} onClick={() =>  api ? api.selectStory(story.id) : addons.getChannel().emit(SELECT_STORY, extractStory())}>
        {importID}
      </Link>
    );  
  }
  return importID;
};