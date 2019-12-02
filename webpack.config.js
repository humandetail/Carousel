const path = require('path'),
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      // 用于复制静态文件
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      // 清除dist目录
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      uglify = require('uglifyjs-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devConfig = {

  mode: 'development',

  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },

  devServer: {
    contentBase: 'dist',
    watchOptions: {
      ignored: /node_modules/
    },
    host: 'localhost',
    port: '3300',
    hot: true,
    overlay: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('public', 'img/[name].[hash:8].[ext]')
        }
      }
    ]
  },

  plugins: [
    new uglify(),
    new CleanWebpackPlugin(), // 这里不需要传递参数，它清除的正好是output里面设置的出口
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
    	chunks: ['index'],
      hash: true,
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空白
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],

  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }

};

module.exports = devConfig;