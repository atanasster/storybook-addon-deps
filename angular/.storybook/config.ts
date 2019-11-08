import { configure, addParameters, addDecorator } from '@storybook/angular';
import { DocsPage } from 'storybook-addon-deps/blocks';
import { withDependenciesContext } from 'storybook-addon-deps';

import addCssWarning from '../src/cssWarning';

addCssWarning();

addParameters({
  options: {
    hierarchyRootSeparator: /\|/ as any,
  },
  docs: {
    iframeHeight: '60px',
    page: DocsPage,
  },
});


addDecorator(withDependenciesContext);

configure(require.context('../src/stories', true, /\.stories\.(ts|mdx)$/), module);
