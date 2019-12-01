import { Configuration } from 'webpack';
import { IPluginOptions } from 'storybook-dep-webpack-plugin';
const DependenciesPlugin = require('storybook-dep-webpack-plugin');

module.exports = (
  config: Configuration,
  options?: IPluginOptions,
): Configuration => {
  const { filter, exclude,  maxLevels } = options;
  return {
    ...config,

    plugins: [
      ...config.plugins,
      //@ts-ignore
      new DependenciesPlugin({
        filter,
        exclude,
        maxLevels,
      })

    ],
  };
};
