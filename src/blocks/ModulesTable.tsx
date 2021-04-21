import React from 'react';
import { Description } from '@storybook/components';
import { SectionRow }  from '@storybook/components/dist/esm/blocks/ArgsTable/SectionRow';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '@storybook/components/dist/esm/typography/shared';

import { ModuleRow } from './ModuleRow';
import { IModulesTableProps } from '../shared/utils';

const ErrorRow = styled.tr<{}>(withReset, ({ theme }) => ({
  backgroundColor: theme.base === 'light' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)',
  border: 'none !important',
  fontSize: `${theme.typography.size.s2}px`,
  padding: '20px',
  color:
    theme.base === 'light'
      ? transparentize(0.4, theme.color.defaultText)
      : transparentize(0.6, theme.color.defaultText),
}));

export const ModulesTable: React.FunctionComponent<IModulesTableProps> = props => {
  const { modules, error, hideEmpty, title, dependents } = props;
  let err;
  if (error) {
    if (hideEmpty) {
      return null;
    }
    err = (
        <Description markdown={error} />
    );
  }
  if (!modules || modules.length === 0) {
    if (hideEmpty) {
      return null;
    }
    err = <>{`No ${!dependents ? 'dependencies' : 'dependents'} found for this component`}</>;
  }
  return (
    <>
      {title && <SectionRow label={title} colSpan={2} level="section"/>}
      {err && <ErrorRow><td colSpan={2}>{err}</td></ErrorRow>}
      {!err && modules.map(module => <ModuleRow key={module.request} module={module} />)}
    </>  
  );
};
