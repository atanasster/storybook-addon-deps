import { configure, addDecorator } from '@storybook/react';
import { withGrommet } from '../dist';
import { grommet, dark } from 'grommet';

addDecorator(withGrommet({
  theme: 'grommet',
  themes: {
    grommet,
    dark,
  },
  boxProps: {
    align: 'start',
  },
}
));

configure(require.context('./', true, /\.stories\.js$/), module);