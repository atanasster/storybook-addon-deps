import { Button } from '@storybook/angular/demo';

export default {
  title: 'Button',
  component: Button
};

export const text = () => ({
  component: Button,
  props: {
    text: 'Hello Button',
  },
});

export const emoji = () => ({
  component: Button,
  props: {
    text: '😀 😎 👍 💯',
  },
});

emoji.story = {
  parameters: { notes: 'My notes on a button with emojis' },
};
