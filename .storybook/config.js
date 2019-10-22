import { configure, addParameters } from '@storybook/react';
import { dependenciesMap } from 'storybook-dep-webpack-plugin/runtime/main';

addParameters({
  dependencies: {
    mapper: dependenciesMap,
  }
});
configure(require.context('./stories', true, /\.stories\.tsx$/), module);