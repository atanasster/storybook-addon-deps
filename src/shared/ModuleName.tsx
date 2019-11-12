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
  const api = useStorybookApi();
  if (story) {
    return (
      //within a docspage, useStorybookApi returns undefined -> no ManagerProvider
      <Link href={`/?path=/docs/${story.id}`} onClick={() => api ? api.selectStory(story.id) : addons.getChannel().emit(SELECT_STORY, story)}>
        {importID}
      </Link>
    );  
  }
  return importID;
};