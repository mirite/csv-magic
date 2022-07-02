const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.tsx'),
	},
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{
				test: /\.s?css$/,
				include: [
					path.resolve(__dirname, 'node_modules'),
				],
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.s?css$/,
				exclude: [
					path.resolve(__dirname, 'node_modules'),
				],
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-modules-typescript-loader' }, //, to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: 'css-loader', options: { modules: true, importLoaders: 1 } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
		alias: {
			styles: path.resolve(__dirname, 'src/styles'),
			modules: path.resolve(__dirname, 'src/modules'),
			components: path.resolve(__dirname, 'src/components'),
			types: path.resolve(__dirname, 'src/types'),
		},
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
						)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
	target: ['web', 'es5'],
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	],
};
