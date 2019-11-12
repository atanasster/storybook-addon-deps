import { configure, addParameters, addDecorator } from '@storybook/react';
import { DocsPage } from '../dist/blocks/DocsPage';
import { withDependenciesContext } from '../dist/index';

addDecorator(withDependenciesContext);

addParameters({
  dependencies: {
    withStoriesOnly: true,
  },
  docs: { page: DocsPage }
});


configure(require.context('./stories', true, /\.stories\.(js|tsx?|mdx)$/), module);