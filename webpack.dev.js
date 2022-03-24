const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/javascripts",
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
        options: {
          presets: [["@babel/preset-env", { targets: "defaults" }]],
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
