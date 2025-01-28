const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PrettierPlugin = require('prettier-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // entry:'./dist/index.html',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true, // HMR diaktifkan di sini
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Modul Replacement',
      template:'./src/index.html',
    }),
    // new PrettierPlugin({
    //   // Opsi Prettier (Opsional)
    //   printWidth: 80,          // Panjang baris maksimal
    //   tabWidth: 2,             // Lebar tab
    //   useTabs: false,          // Menggunakan spasi, bukan tab
    //   semi: true,              // Menambahkan titik koma
    //   encoding: 'utf-8',       // Encoding file
    //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html'],
    // }),
  ],
};