const path = require('path');
const webpack = require('webpack');
const { init } = require('chill-core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * Configure Webpack.
 *
 * TODO: Extract common config.
 *
 * @returns {Promise}
 */
async function configureWebpack() {
  const config = await init();
  const baseHref = config.dashboard.baseHref || '';

  return {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js', // the entry point of our app
    output: {
      publicPath: '/',
      chunkFilename: 'js/chunk.[name].[chunkhash].js',
      filename: 'js/bundle.[chunkhash].js', // the output bundle
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: `file-loader?name=[name].[ext]&publicPath=${baseHref}/images/&outputPath=/images/`
        },
        {
          test: /\.ico$/,
          use: 'file-loader?name=[name].[ext]&publicPath=/images/&outputPath=/'
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/bundle.[hash].css',
        chunkFilename: 'css/chunk.[name].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        '__INJECTED_CONFIG.dashboard': JSON.stringify(config.dashboard)
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /node_modules/,
            enforce: true
          },
        }
      },
      runtimeChunk: true
    },
  };
}

module.exports = configureWebpack();
