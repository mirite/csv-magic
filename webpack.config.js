import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();
const postcssLoader = {
	loader: "postcss-loader",
};
export default {
	entry: {
		app: [path.join(__dirname, "src/index.tsx")],
	},
	module: {
		rules: [
			{ loader: "ts-loader", test: /\.tsx?$/ },
			{
				exclude: /\.module\.css$/,
				test: /\.css$/,
				use: ["style-loader", "css-loader", postcssLoader],
			},
			{
				include: /\.module\.css$/,
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							esModule: false,
							modules: {
								localIdentName: "[name]__[local]--[hash:base64:5]",
								namedExport: false,
							},
						},
					},
					postcssLoader,
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
			"@": path.join(__dirname, "src"),
		},
		extensionAlias: { ".js": [".ts", ".js", ".tsx"] },
		extensions: [".tsx", ".ts", ".js", ".css"],
	},
};
