/* global window */

import {
  configure,
  addParameters,
  addDecorator,
  setCustomElements,
} from '@storybook/web-components';
import { DocsPage } from 'storybook-addon-deps/blocks';
import { withDependenciesContext } from 'storybook-addon-deps';


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


addDecorator(withDependenciesContext);
