const DependenciesPlugin = require('storybook-dep-webpack-plugin');

module.exports = {
  presets: ['@storybook/addon-docs/preset'],
  stories: [
    './stories/**/*.stories.(js|tsx|mdx)',
  ],
  addons: [
    './dist/register',
    'storybook-dark-mode/register',
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
      alias: {...config.resolve.alias, ...{
        "styled-components": path.resolve(path.resolve(__dirname, '..'), "node_modules", "styled-components"),
        "@storybook/addon-docs": path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "addon-docs"),
        "@storybook/theming": path.resolve(path.resolve(__dirname, '..'), "node_modules", "@storybook", "theming"),
      }}
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
