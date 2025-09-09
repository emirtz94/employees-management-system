import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import { Configuration, DefinePlugin } from "webpack";

import dotenv from 'dotenv';
dotenv.config();

export const common: Configuration = {
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
};
