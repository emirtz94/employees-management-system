
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import merge from "webpack-merge";

import { common } from "./webpack.common";

const prodConfig: Configuration = {
  mode: "production",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    minimizer: [
        new CssMinimizerPlugin()
    ]
  }
};


export default merge(common, prodConfig);