const path = require('path');
const webpack = require('webpack');

const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build
  exclude: {
    test: path.resolve(__dirname, 'node_modules'),
    exclude: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/react-native-uncompiled'),
      path.resolve(__dirname, 'node_modules/react-native'),
      path.resolve(__dirname, 'node_modules/react-native-web-linear-gradient'),
      path.resolve(__dirname, 'node_modules/react-native-gifted-chat'),
      path.resolve(__dirname, 'node_modules/react-clone-referenced-element'),
      path.resolve(__dirname, 'node_modules/react-navigation'),
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
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    __dirname + '/App.web.js',
  ],
  // ...the rest of your config
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(
          __dirname,
          'node_modules/react-native-vector-icons',
        ),
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
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    inline: true,
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      expo: path.resolve(__dirname, 'shims/expo'),
      '@expo/vector-icons': path.resolve(__dirname, 'shims/@expo/vector-icons'),
      '@expo/react-native-action-sheet': path.resolve(
        __dirname,
        'shims/@expo/react-native-action-sheet',
      ),
      'react-navigation': path.resolve(__dirname, 'shims/react-navigation'),
    },
    extensions: ['.web.js', '.js', '.json'],
  },
};
