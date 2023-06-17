import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __dirname = path.resolve();
export default {
  entry: {
    app: path.join(__dirname, "src/index.tsx"),
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader" }, //, to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 },
          }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    alias: {
      styles: path.join(__dirname, "src/styles"),
      modules: path.join(__dirname, "src/modules"),
      components: path.join(__dirname, "src/components"),
      types: path.join(__dirname, "src/types"),
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
