import React from 'react';
import { AvatarList } from '@storybook/design-system/dist/components/AvatarList';

export default {
  title: 'Options/Hide Empty',
  component: AvatarList,
  parameters: {
    dependencies: {
      hideEmpty: true,
    },  
  }
};

export const short = () => <AvatarList users={[]} />;
