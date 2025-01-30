
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/, // Mendeteksi file .js atau .mjs
        exclude: /node_modules/, // Mengecualikan folder node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Menggunakan preset-env untuk kompatibilitas
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // hash: true,
      title: 'Hot Module Replacement',
      template: './src/index.html',
      inject: 'body',
    }),
    
      
    
  ],
};
