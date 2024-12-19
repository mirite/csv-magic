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
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
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
								plugins: function() {
									return [autoprefixer];
								},
							},
						},
					},
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.s?css$/,
				include: /node_modules/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: function() {
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
