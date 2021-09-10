import path from 'path';

export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config: any) => {
    config.module.rules.find((rule: any) => rule.test && rule.test.test('.svg')).exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
      enforce: 'pre',
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          assets: path.resolve(__dirname, '..', 'src', 'assets'),
          components: path.resolve(__dirname, '..', 'src', 'components'),
          styles: path.resolve(__dirname, '..', 'src', 'styles'),
          stories: path.resolve(__dirname, '..', 'src', 'stories'),
          utils: path.resolve(__dirname, '..', 'src', 'utils'),
        },
      },
    };
  },
};
