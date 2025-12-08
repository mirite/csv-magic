import { StrictMode } from "react";

import App from "./app/App.js";

const container = document.getElementById("root");
if (!container) {
	throw new Error("Could not find container");
}

import("react-dom/client").then(({ createRoot }) => {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
