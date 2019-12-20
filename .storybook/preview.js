import { addParameters } from '@storybook/react';
import { DocsPage } from '../dist/blocks/DocsPage';

addParameters({
  options: { showRoots: false },
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: false }
});
