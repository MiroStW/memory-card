const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index.tsx", "./src/style.css"],
  output: {
    filename: "[name].js", // filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "build/"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve("src"),
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { development: true }],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Memory cards game",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Memory cards game - 404",
      template: "./src/404.html",
      filename: "404.html",
    }),
  ],
  devtool: "source-map",
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
