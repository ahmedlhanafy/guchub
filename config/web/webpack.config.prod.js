const path = require('path');
const webpack = require('webpack');
const mergeWith = require('lodash.mergewith');
const isArray = require('lodash.isarray');
const Jarvis = require('webpack-jarvis');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sharedConfig = require('./webpack.config.shared');

const customizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

module.exports = mergeWith(
  sharedConfig,
  {
    entry: {
      vendor: ['react', 'react-native-web', 'react-apollo', 'styled-components'],
      app: [__dirname + '/App.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve('public'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          __DEV__: JSON.stringify('false'),
          PLATFORM_ENV: JSON.stringify('web'),
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity,
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.optimize.UglifyJsPlugin(),
      new CompressionPlugin(),
      new Jarvis(),
      new BundleAnalyzerPlugin(),
    ],
  },
  customizer
);
