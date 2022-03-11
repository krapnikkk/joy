const merge = require("webpack-merge");
const common = require("./webpack.common.js");

process.env.NODE_ENV = "development";

module.exports = merge(common, {
  devtool: "eval-source-map",
  mode: "development",
});
