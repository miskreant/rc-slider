var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var cwd = process.cwd();
var pkg = require(path.join(cwd, 'package.json'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  new ExtractTextPlugin("slider.css")
];

var entry = path.join(__dirname, './index.js');

function getResolve() {
  var alias = {};
  var resolve = {
    root: cwd,
    extensions: ['', '.js', '.jsx'],
    alias: alias,
  };
  var name = pkg.name;
  alias[name + '$'] = path.join(cwd, 'index.js');
  alias[name] = cwd;
  return resolve;
};

module.exports = {
  entry: entry,
  resolve: getResolve(),
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   loader: ExtractTextPlugin.extract('css?sourceMap!autoprefixer-loader')
      // },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css?sourceMap!autoprefixer-loader!less?sourceMap')
      }
    ],
  },
  output: {
    library: 'Slider',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'slider.js',
  },
  // This is key. https://gist.github.com/STRML/2117f574726bdf0b8d58
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },

  node: {
    Buffer: false
  },

  plugins: plugins
};
