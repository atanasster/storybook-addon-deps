import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import { addons } from '@storybook/addons';

interface DependencyErrorProps {
  map?: IDependenciesMap,
  component?: { name: string },
}

export const dependencyError = ({ map, component }: DependencyErrorProps) => {
  if (!map) {
    const channel = addons.getChannel();
    const eventNames = channel.eventNames();
    console.log(eventNames);    
    return `
              
        No dependencies to display.
        Possible reasons: 

        1. Still loading.
                
        2. Not including the following in your storybook \`config.js\` file
          \`\`\`
          import { ..., addDecorator } from '@storybook/{yourframework}';
          import { withDependenciesContext } from 'storybook-addon-deps';
          ...
          addDecorator(withDependenciesContext);
          ...
          \`\`\`
          
     `
  }
  const { error: injectError } = map;
  if (injectError) {
    return `
              
        It seems the dependencies were not injected in your storybook bundles: 

        Add the following to your \`.storybook/webpack.config.js:\`
        
        \`\`\`
        const DependenciesPlugin = require('storybook-dep-webpack-plugin');
        ...

        module.exports = ({ config, mode }) => {          
          config.plugins.push(new DependenciesPlugin({
            //options
          }));
          return config;
        };
        \`\`\`
              
      `
  }
  if (!component) {
    return `
        
        No component parameter found.
        Please ensure that you have specified a \`component\` parameter in the story:

        1. CSF Format:
        \`\`\`
        export default {
          title: ...,
          component: Button,
        };
        \`\`\`

        2. storiesOf
        \`\`\`
          storiesOf('component', module)
            ...
            .addParameters({ component: Button })
            ...
          ;
          \`\`\`  

        3. MDX
        \`\`\`
        <Meta
          title='...'
          parameters={{ component: Button }}
        />
        \`\`\`
    `    
  } 
  return null;    
}