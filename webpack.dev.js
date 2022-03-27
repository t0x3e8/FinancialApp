import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import ESLintPlugin from "eslint-webpack-plugin";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/u,
        loader: "vue-loader",
      },
      {
        test: /\.js$/u,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
    ],
  },
  devtool: "source-map",
  plugins: [new VueLoaderPlugin(), new ESLintPlugin()],
};
