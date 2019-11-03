import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from  '@storybook/components';
import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { DocsContext } from '@storybook/addon-docs/blocks';
import { transparentize } from 'polished';
import { IDepencency } from 'storybook-dep-webpack-plugin/runtime/types';

import { StoryInput } from '../types';

interface PropRowProps {
  dependency: IDepencency;
}

interface NameProps {
  story: StoryInput;
  children: string;
}

const Bold = styled.span({ fontWeight: 'bold' });
//@ts-ignore
const Name = ({ story, children }: NameProps ) => {
  const text = <Bold>{children}</Bold>;
  if (story) {
    return (
      <Link href={`/?path=/docs/${story.id}`} onClick={() => addons.getChannel().emit(SELECT_STORY, story)}>
        {text}
      </Link>
    );  
  }
  return text;
};


const StyledPropDef = styled.div<{}>(({ theme }) => ({
  color:
    theme.base === 'light'
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText),
  fontFamily: theme.typography.fonts.mono,
  fontSize: `${theme.typography.size.code}%`,
}));

export const DependencyRow: React.FunctionComponent<PropRowProps> = ({
  dependency: { name, id, request, contextPath },
}) => (
  <DocsContext.Consumer>
    {context => {
      const storyName = name && context && context.storyStore && context.storyStore._data
       && Object.keys(context.storyStore._data).find(storyname => {
         const parameters = context.storyStore._data[storyname].parameters;
         return parameters && parameters.component  && parameters.component.name === name;
        });
      const story = storyName ? context.storyStore._data[storyName] : undefined;
      return (
        <tr>
          <td>
            <Name story={story}>{id === name ? (id || request) : `${name} (${id})`}</Name>
          </td>
          <td>
            <StyledPropDef>{contextPath}</StyledPropDef>
          </td>
        </tr>
      )}
    }  
  </DocsContext.Consumer>
);
