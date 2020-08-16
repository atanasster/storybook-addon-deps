import { addParameters } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { DocsPage } from 'storybook-addon-deps/blocks';

import addCssWarning from '../src/cssWarning';


// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import docJson from '../documentation.json';

setCompodocJson(docJson);

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
