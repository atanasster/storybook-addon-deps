const DependenciesPlugin = require('storybook-dep-webpack-plugin');
const path = require('path');

module.exports = ({ config, mode }) => {
  config.resolve.alias["styled-components"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "styled-components");
  config.resolve.alias["@storybook/addon-docs"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "addon-docs");
  config.resolve.alias["@storybook/theming"] = path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "theming");

  config.plugins.push(new DependenciesPlugin({
    //by default @storybook modules are also excluded
    exclude: /^@babel/
  }));
  return config;
};
