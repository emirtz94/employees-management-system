import { merge } from "webpack-merge";
import { common } from "./webpack.common";
import { Configuration } from "webpack";

const developmentConfig: Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
};

export default merge(common, developmentConfig);
