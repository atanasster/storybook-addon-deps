import Button from '../Button.vue';

export default {
  title: 'Button',
  component: Button,
};

export const rounded = () => ({
  components: { Button },
  template: '<my-button :rounded="true">A Button with rounded edges</my-button>',
});

export const square = () => ({
  components: { Button },
  template: '<my-button :rounded="false">A Button with square edges</my-button>',
});
