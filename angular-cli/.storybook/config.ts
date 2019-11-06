import { configure, addParameters, addDecorator } from '@storybook/angular';
import { dependenciesMap } from 'storybook-dep-webpack-plugin/runtime/main';
import { DocsPage } from '../../dist/blocks/DocsPage';

import addCssWarning from '../src/cssWarning';

addCssWarning();

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
  },
  dependencies: {
    mapper: dependenciesMap,
  },
  docs: {
    iframeHeight: '60px',
    page: DocsPage,
  },
});


configure(require.context('../src/stories', true, /\.stories\.(ts|mdx)$/), module);
