const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  // entry: './src/index.js'
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!saaa-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.stylus$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.9ji.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.less', '.stylus'],
    alias: {
      '@': path.join(__dirname, './', 'src')
    }
  }
}