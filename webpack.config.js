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
    ],
  },
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['react-native'],
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app
      plugins: [require('./node_modules/react-native-web/babel')],
      // The 'react-native' preset is recommended (or use your own .babelrc)
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

module.exports = {
  // ...the rest of your config
  entry: __dirname + '/App.web.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
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
          'node_modules/react-native-vector-icons'
        ),
      },
    ],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
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
