const DependenciesPlugin = require('storybook-dep-webpack-plugin');

module.exports = {
  presets: ['@storybook/addon-docs/preset'],
  stories: [
    '../stories/**/*.stories.(js|ts|tsx|mdx)',
  ],
  addons: [
    'storybook-addon-deps/register',
  ],
  webpack: async (config, { configType }) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.slice(1),
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          }
        }   
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...(config.resolve.extensions || []), '.ts', '.tsx'],
    },
    plugins: [
      ...config.plugins,
      new DependenciesPlugin({
        //by default @storybook modules are also excluded
        exclude: /^@babel/
      })
    ]
  }),
};
