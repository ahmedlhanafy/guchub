const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  entry: [
    __dirname + '/App.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
    // publicPath: '/',
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
      {
        test: /\.js$/,
        exclude: {
          test: path.resolve('node_modules'),
          exclude: [
            path.resolve('src'),
            path.resolve('node_modules/react-native-uncompiled'),
            path.resolve('node_modules/react-native'),
            path.resolve('node_modules/react-native-web-linear-gradient'),
            path.resolve('node_modules/react-clone-referenced-element'),
          ],
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve('node_modules/react-native-vector-icons'),
      },
    ],
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
    // new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      expo: path.resolve(__dirname, 'shims/expo'),
      '@expo/vector-icons': path.resolve(__dirname, 'shims/@expo/vector-icons'),
    },
    extensions: ['.web.js', '.js', '.json'],
  },
};
