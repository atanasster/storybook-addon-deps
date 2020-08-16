/* global window */

import {
  addParameters,
  setCustomElements,
} from '@storybook/web-components';
import { DocsPage } from 'storybook-addon-deps/blocks';

import customElements from '../custom-elements.json';

setCustomElements(customElements);


addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
  },
  docs: {
    iframeHeight: '200px',
    page: DocsPage,
  },
});
