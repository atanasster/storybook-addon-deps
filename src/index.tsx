import { useChannel } from '@storybook/client-api';
import { getDependencyMap } from 'storybook-dep-webpack-plugin/runtime/main';
import { EVENTS } from './constants';

export const withDependenciesContext = (storyFn: () => any) => {
 const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, getDependencyMap());
    },
  });  
  return storyFn();
};
