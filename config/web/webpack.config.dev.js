const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  devtool: 'cheap-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    'react-hot-loader/patch',
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
            path.resolve('node_modules/react-native-gifted-chat'),
            path.resolve('node_modules/react-clone-referenced-element'),
            path.resolve('node_modules/react-navigation'),
          ],
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              [
                'react-transform',
                {
                  transforms: [
                    {
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module'],
                    },
                  ],
                },
              ],
            ],
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
        NODE_ENV: JSON.stringify('development'),
        __DEV__: JSON.stringify('true'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    port: 3000,
    contentBase: path.resolve('public'),
    hot: true,
    stats: {
      colors: true,
    },
    inline: true,
    disableHostCheck: true,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      expo: path.resolve(__dirname, 'shims/expo'),
      '@expo/vector-icons': path.resolve(__dirname, 'shims/@expo/vector-icons'),
    },
    extensions: ['.web.js', '.js', '.json'],
  },
};
