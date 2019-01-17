const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
  vendor: [
    // Required to support async/await
    '@babel/polyfill',
  ],
  main: ['./src/index'],},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.json'],

},

  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
  }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_URL': JSON.stringify(''),
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),

  ],
  devServer: {
    port: '3000',
    hot: true,
    noInfo: true,
    quiet: false,
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/'
},
}