import React from 'react';
import { Link } from  '@storybook/components';
import { styled } from '@storybook/theming';
import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { IDependency } from 'storybook-dep-webpack-plugin/runtime/types';
import { StoryInput } from '../types';


interface ModuleNameProps {
  story: StoryInput;
  module: IDependency;
}

const Bold = styled.span({ fontWeight: 'bold' });

export const ModuleName = ({ story, module }: ModuleNameProps ) => {
  const { id, request, name } = module;
  const importID = <Bold>{id === name ? (id || request) : name}</Bold>;
  if (story) {
    return (
      <Link href={`/?path=/docs/${story.id}`} onClick={() => addons.getChannel().emit(SELECT_STORY, story)}>
        {importID}
      </Link>
    );  
  }
  return importID;
};