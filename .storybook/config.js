import { configure, addParameters } from '@storybook/react';
import { dependenciesMap } from 'storybook-dep-webpack-plugin/runtime/main';
import { DocsPage } from '../dist/blocks/DocsPage';
addParameters({
  dependencies: {
    mapper: dependenciesMap,
  },
  docs: { page: DocsPage }
});
configure(require.context('./stories', true, /\.stories\.tsx$/), module);