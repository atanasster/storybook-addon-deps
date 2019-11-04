import { styled } from '@storybook/theming';
import { transparentize } from 'polished';

export const StyledLight = styled.div<{}>(({ theme }) => ({
  color:
    theme.base === 'light'
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText),
  fontFamily: theme.typography.fonts.mono,
  fontSize: `${theme.typography.size.code}%`,
}));

export const StyledSmallLight = styled(StyledLight)<{}>(() => ({
  fontSize: `80%`,
}));