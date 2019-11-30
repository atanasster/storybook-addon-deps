import { configure, addParameters, addDecorator } from '@storybook/react';
import { DocsPage } from '../dist/blocks/DocsPage';
import { withDependenciesContext } from '../dist/index';

addDecorator(withDependenciesContext);

addParameters({
  options: { showRoots: false },
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: false }
});
