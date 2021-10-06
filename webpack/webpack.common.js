// const dotenv = require("dotenv");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
// const Dotenv = require("dotenv-webpack");
const pkg = require("../package.json");

const rootDir = path.join(__dirname, "../");
const srcDir = path.join(rootDir, "src");

// dotenv.config();

const entry = {};
const plugins = [];
const page = process.env.PAGE;
const isUseExLoader = process.env.EX_LOADER;
let pages;

// if (page) {
//   if (isUseExLoader) {
//     pages = ["background", "content"];
//   } else {
//     pages = [page];
//   }
// } else {
//   // pages = ["options", "background", "content", "view-tab"];
//   pages = ["background", "content"];
// }

if (page) {
  if (isUseExLoader) {
    pages = [{ 'name': "background", 'html': false }, { 'name': "view-tab", 'html': true }, { 'name': "content", 'html': false },{ 'name': "inject", 'html': false }];
  } else {
    pages = [page];
  }
} else {
  pages = [{ 'name': "view-tab", 'html': true }, { 'name': "background", 'html': false },{ 'name': "content", 'html': false },{ 'name': "inject", 'html': false }];
}

if (isUseExLoader) {
  plugins.push(
    new ExtensionReloader({
      entries: {
        manifest: path.resolve(__dirname, "../public/manifest.json"),
        contentScript: "content",
        background: "background",
      },
    }),
  );
}


pages.forEach(page => {
  let name = page['name'] || page;
  entry[name] = path.join(srcDir, name, "index");
  plugins.push(
    new HtmlWebpackPlugin({
      title: `Joy`,
      filename: `${name}.html`,
      root: name,
      template: path.join(rootDir, "public", "index.html"),
      chunks: [name]
    }),
  );
});

module.exports = {
  entry,
  output: {
    path: path.join(rootDir, "dist/"),
    filename: "js/[name].bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory()],
          }),
          compilerOptions: {
            module: "es2015",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
      //   {
      //     test: /\.html$/,
      //     loader: "html-loader",
      //     options: {
      //       minimize: true,
      //       removeComments: false,
      //       collapseWhitespace: false
      //     }
      //   }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "../src/icons.ts"),
      "@src": path.resolve(__dirname, "../src"),
    },
  },
  plugins: [
    ...plugins,
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: "manifest.json",
          transform: function (content, path) {
            return Buffer.from(
              JSON.stringify({
                description: pkg.description,
                version: pkg.version,
                ...JSON.parse(content.toString()),
              }),
            );
          },
        },
        {
          from: ".", to: "."
        },
      ],
      { context: "public", ignore: ["index.html"] },
    ),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
      chunkFilename: "[id].css",
    }),
    // new Dotenv(),
  ],
};
