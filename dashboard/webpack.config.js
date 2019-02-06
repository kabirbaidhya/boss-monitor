const path = require('path');
const webpack = require('webpack');
const { init } = require('chill-core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Configure Webpack.
 *
 * TODO: Extract common config.
 *
 * @returns {Promise}
 */
async function configureWebpack() {
  const config = await init();

  return {
    mode: 'development',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8181', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
      './index.js' // the entry point of our app
    ],
    output: {
      publicPath: '/',
      filename: 'js/bundle.js', // the output bundle
      chunkFilename: 'js/chunk.[id].js',
      path: path.resolve(__dirname, 'dist')
    },
    context: path.resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
      port: 8181,
      hot: true, // enable HMR on the server
      publicPath: '/', // match the output 'publicPath'
      historyApiFallback: true, // respond to 404s with index.html
      contentBase: path.resolve(__dirname, 'dist') // match the output path
    },
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
          use: 'file-loader'
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
        filename: 'css/bundle.css',
        chunkFilename: 'css/chunk.[name].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        '__INJECTED_CONFIG.dashboard': JSON.stringify(config.dashboard)
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
      new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors
      new webpack.HotModuleReplacementPlugin() // enable HMR globally
    ],
    optimization: {
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
