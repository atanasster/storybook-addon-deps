import { IDependenciesMap } from 'storybook-dep-webpack-plugin/runtime/types';
import { addons } from '@storybook/addons';

interface DependencyErrorProps {
  map?: IDependenciesMap,
  component?: { name: string },
}

export const errors = {
  LOADING_OR_NO_CONFIG: `
              
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
    
`,
  LOADING: `No dependencies to display yet, data still loading.`,
  NO_INJECT: `
              
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
        
`,
NO_COMPONENT: `
        
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
`,
NO_DEPENDENCIES: `No dependencies found for this component`
}
export const dependencyError = ({ map, component }: DependencyErrorProps) => {
  if (!map) {
    const channel = addons.getChannel();
    const eventNames = channel.eventNames();
    if (eventNames.indexOf('RETURN_DEPENDENCIES') >= 0) {
      return errors.LOADING;
    }
    return errors.LOADING_OR_NO_CONFIG;

  }
  const { error: injectError } = map;
  if (injectError) {
    return errors.NO_INJECT
  }
  if (!component) {
    return errors.NO_COMPONENT
  } 
  return null;    
}