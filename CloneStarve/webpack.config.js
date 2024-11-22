const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // Import plugin

module.exports = {
  entry: './src/main.ts', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  
  },
  resolve: {
    extensions: ['.ts', '.js'],  
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // Quy tắc xử lý ảnh
        type: 'asset/resource',  
        generator: {
          filename: 'assets/[name][ext][query]',  
        },
      },
    ],
  },
  
  devtool: 'source-map',  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  
      filename: 'index.html',        
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  
    },
    compress: true,
    port: 9000,
    open: true,  
  }
};
