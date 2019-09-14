import React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID, PANEL_ID } from './constants';
import { DependencyPanel } from './containers/DependecyPanel';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.TAB,
    title: 'Deps',
    route: ({ storyId }) => `/deps/${storyId}`,
    match: ({ viewMode }) => viewMode === 'deps',
    render: ({ active }) => <DependencyPanel api={api} active={active} />,
  });
});
