import App from "./App/App";
import React from "react";
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
if(!container) {
	throw new Error("Could not find container");
}

const root = createRoot(container);
root.render(<App />);
