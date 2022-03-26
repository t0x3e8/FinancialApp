/* global __dirname */

import { resolve } from "path";
import { VueLoaderPlugin } from "vue-loader";

export const mode = "development";
export const entry = "./src/main.js";
export const output = {
  path: resolve(__dirname, "public"),
  publicPath: "/public/javascripts",
  filename: "app.js",
};
export const module = {
  rules: [
    {
      test: /\.vue$/u,
      loader: "vue-loader",
    },
    {
      test: /\.js$/u,
      exclude: "/node_modules/",
      loader: "babel-loader",
      options: {
        presets: [["@babel/preset-env", { targets: "defaults" }]],
      },
    },
  ],
};
export const plugins = [new VueLoaderPlugin()];
