const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const CopyPlugin = require('copy-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

/**
 * @return {import('webpack').Configuration}
 */
const config = env => {
  const isEnvDevelopment = !!env.development;
  const isEnvProduction = !!env.production;

  return {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: './static/js/index.js',
    output: {
      filename: 'public/js/bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            isEnvDevelopment && 'style-loader',
            isEnvProduction && MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                  postcssNormalize(),
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
            },
            'sass-loader',
          ].filter(Boolean),
          sideEffects: true,
        },
      ],
    },
    plugins: [
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'public/css/style.css',
        }),
      new CopyPlugin([
        { from: 'public', to: 'public' },
        { from: 'views', to: 'views' },
      ]),
    ].filter(Boolean),
  };
};

module.exports = config;
