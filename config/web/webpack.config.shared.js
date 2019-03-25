const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
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
            presets: [
              'module:metro-react-native-babel-preset',
              {
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
      'react-router-native': path.resolve(__dirname, 'shims/react-router'),
    },
    extensions: [
      '.ts',
      '.tsx',
      `.ios.ts`,
      `.web.ts`,
      '.native.ts',
      `.ios.tsx`,
      `.web.tsx`,
      '.native.tsx',
      '.web.js',
      '.ios.js',
      '.js',
      '.json',
    ],
  },
  plugins: [
    new Dotenv(),
    // This is used to make webpack include index.html and icons in webpack's build so that workbox detects it
    new CopyWebpackPlugin([
      { from: `${path.resolve('public')}/index.html`, to: `${path.resolve('public')}/index.html` },
      {
        from: `${path.resolve('public')}/launcher-icons`,
        to: `${path.resolve('public')}/launcher-icons`,
        ignore: '.DS_Store',
      },
    ]),
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
      // globPatterns: [path.resolve('public') + '/*.{js,js.gz,png,html,css}'],
      runtimeCaching: [
        {
          urlPattern: /(.*?)/,
          handler: 'staleWhileRevalidate',
        },
      ],
    }),
  ],
};
