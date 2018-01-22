const path = require('path');

module.exports = {
  module: {
    rules: [
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
            path.resolve('node_modules/react-router-native'),
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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
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
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      expo: path.resolve(__dirname, 'shims/expo'),
      '@expo/vector-icons': path.resolve(__dirname, 'shims/@expo/vector-icons'),
      'react-native-svg': 'react-native-svg-web',
    },
    extensions: ['.web.js', '.ios.js', '.js', '.json'],
  },
};
