import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { IDepencency } from 'storybook-dep-webpack-plugin/runtime/types';

interface PropRowProps {
  dependency: IDepencency;
}

const Name = styled.span({ fontWeight: 'bold' });


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
  <tr>
    <td>
      <Name>{id === name ? (id || request) : `${name} (${id})`}</Name>
    </td>
    <td>
      <StyledPropDef>{contextPath}</StyledPropDef>
    </td>
  </tr>
);
