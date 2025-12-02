import path from "path";

import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();
export default {
	entry: {
		app: [path.join(__dirname, "src/index.tsx")],
	},
	module: {
		rules: [
			{ loader: "ts-loader", test: /\.tsx?$/ },
			{
				exclude: /node_modules/,
				test: /\.s?css$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: function () {
									return [autoprefixer];
								},
							},
						},
					},
					{ loader: "sass-loader" },
				],
			},
			{
				include: /node_modules/,
				test: /\.s?css$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: function () {
									return [autoprefixer];
								},
							},
						},
					},
					{ loader: "sass-loader" },
				],
			},
		],
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
	resolve: {
		alias: {
			components: path.join(__dirname, "src/components"),
			modules: path.join(__dirname, "src/modules"),
			styles: path.join(__dirname, "src/styles"),
			types: path.join(__dirname, "src/types"),
		},
		extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
	},
};
