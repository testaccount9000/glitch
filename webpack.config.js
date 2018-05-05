const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');



const PUBLIC = path.resolve(__dirname, 'public');
const SRC = path.resolve(__dirname, 'src');
const BASE = path.resolve(__dirname, '.');


module.exports = () => {
  
  let mode = 'development';
  if(process.env.NODE_ENV === 'production') {
    mode = 'production';
  }
  
  console.log(`Starting Webpack in ${mode} mode.`);
  
  return {
    mode,
    entry: {
      "client-bundle": `${SRC}/client.js`
    },
    output: {
      filename: '[name].js',
      path: PUBLIC
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.jsx?$/,
          exclude: [/templates/, /cache/],
          include: SRC,
          loader: "eslint-loader",
          options: {
            fix: true,
            cache: `${SRC}/.eslintcache`, //caching tends to make the config stick, so disable this when reconfiguring
            emitError: true,
            emitWarning: true,
            failOnError: false,
          }
        },
        {
          test: /\.jsx?/,
          include: SRC,
          exclude: /node_modules/,
          loader : 'babel-loader'
        },
      ],
    },
    plugins: [
      new LodashModuleReplacementPlugin,
    ],
  };
}
