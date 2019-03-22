const path = require('path');
const webpack = require('webpack');
const mergeWith = require('lodash.mergewith');
const isArray = require('lodash.isarray');
const Jarvis = require('webpack-jarvis');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const sharedConfig = require('./webpack.config.shared');

const customizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

module.exports = mergeWith(
  sharedConfig,
  {
    devtool: 'cheap-module-source-map',
    entry: {
      app: [
        // 'webpack-dev-server/client?http://localhost:3000',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        // 'webpack/hot/only-dev-server',
        // 'babel-polyfill',
        // 'react-hot-loader/patch',
        __dirname + '/index.js',
      ],
    },
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve('public'),
      // devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      // publicPath: '/',
      crossOriginLoading: 'anonymous',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          enforce: 'pre',
          include: path.resolve('src'),
          use: [
            {
              loader: 'eslint-loader',
              options: {
                emitWarning: true,
                configFile: './.eslintrc',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          __DEV__: JSON.stringify('true'),
          PLATFORM_ENV: JSON.stringify('web'),
        },
      }),
      // Add module names to factory functions so they appear in browser profiler.
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new Jarvis(),
      new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    ],
    devServer: {
      port: 3000,
      contentBase: path.resolve('public'),
      // hot: true,
      stats: {
        colors: true,
      },
      inline: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      overlay: false,
      historyApiFallback: {
        // Paths with dots should still use the history fallback.
        // See https://github.com/facebookincubator/create-react-app/issues/387.
        disableDotRule: true,
      },
      host: 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      before(app) {
        // This lets us open files from the runtime error overlay.
        app.use(errorOverlayMiddleware());
        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
        app.use(noopServiceWorkerMiddleware());
      },
    },
  },
  customizer
);
