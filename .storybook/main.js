const custom = require('../webpack/webpack.common');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.module.rules.find((rule) => rule.test && rule.test.test('.svg')).exclude = /\.svg$/;

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: custom.resolve.alias,
      },
      module: {
        ...config.module,
        rules: [...custom.module.rules],
      },
    };
  },
};
