const DependenciesPlugin = require('storybook-dep-webpack-plugin');
const path = require('path');

module.exports = ({ config, mode }) => {
  // following lines just for local debugging. List here all the modules that have shared contexts
  // avoid rte when multiple copies of shared packages are loaded during local debugging
  config.resolve.alias["styled-components"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "styled-components");
  config.resolve.alias["@storybook/addon-docs"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "addon-docs");
  config.resolve.alias["@storybook/theming"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "theming");
  //end debug config 

  // the following is the only configuration required for collecting dependencies data
  config.plugins.push(new DependenciesPlugin({
  }));
  return config;
};
