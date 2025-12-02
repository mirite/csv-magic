import type { ReactElement } from "react";
import React, { Suspense } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../index.scss";
import * as styles from "./App.module.css";

const ViewContainer = React.lazy(
	() =>
		import(
			/* webpackChunkName: "view-container" */ "../components/ViewContainer/ViewContainer"
		),
);

/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	return (
		<div>
			<header className={styles.header}>
				<h1>🪄CSV Magic🪄</h1>
			</header>
			<main className={styles.main}>
				<p>
					CSV Magic is a replacement for traditional spreadsheet software for
					tasks involving transforming data. This app takes a comma separated
					value file (.csv) and allows for sorting, filtering, and other large
					scale manipulations within one or multiple CSV files.
				</p>
				<p>
					The app runs and processes data entirely in your web browser with no
					spreadsheet data sent to the server.
				</p>
				<p>
					<a
						href="https://github.com/mirite/csv-magic"
						rel="noreferrer"
						target="_blank"
					>
						View On GitHub
					</a>
				</p>
				<Suspense fallback={<div>Loading...</div>}>
					<ViewContainer />
				</Suspense>
			</main>
			<footer className={styles.footer}>
				Copyright &copy; {new Date().getFullYear()}{" "}
				<a href="https://jesseconner.ca" rel="noreferrer" target="_blank">
					Jesse Conner
				</a>
			</footer>
		</div>
	);
}

export default App;
