import { configure, addParameters, addDecorator } from '@storybook/react';
import { DocsPage } from '../dist/blocks/DocsPage';
import { withDependenciesContext } from '../dist/index';

addParameters({
  docs: { page: DocsPage }
});

addDecorator(withDependenciesContext);

configure(require.context('./stories', true, /\.stories\.(js|tsx?|mdx)$/), module);