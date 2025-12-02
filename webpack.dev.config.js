import path from "path";

import base from "./webpack.config.js";

const __dirname = path.resolve();

export default {
	...base,
	devServer: {
		hot: true, // enable HMR
	},
	devtool: "source-map",
	entry: {
		app: [
			"webpack-dev-server/client?http://localhost:8080", // HMR needs a full path
			"webpack/hot/only-dev-server", // "only" prevents reload on syntax errors
			path.join(__dirname, "src", "index.tsx"),
		],
	},
};
