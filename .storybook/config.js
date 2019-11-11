import { configure, addParameters, addDecorator } from '@storybook/react';
import { DocsPage } from '../dist/blocks/DocsPage';
import { withDependenciesContext } from '../dist/index';

addDecorator(withDependenciesContext);

addParameters({
  docs: { page: DocsPage }
});


configure(require.context('./stories', true, /\.stories\.(js|tsx?|mdx)$/), module);