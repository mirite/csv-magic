import React from 'react';
import './App.css';
import ViewContainer from './components/ViewContainer';
import styles from './styles/App.module.css';

function App() {
	return (
		<div className="App">
			<header className={styles.header}>
				<h1>🪄CSV Magic🪄</h1>
			</header>
			<main className={styles.main}>
				<p>
					CSV Magic is a spreadsheet editor that allows for sorting,
					filtering, and other large scale manipulations within one or
					multiple CSV files.
				</p>
				<p>
					The app runs entirely in browser with no backend supporting
					it.
				</p>
				<p>
					<a
						href="https://github.com/mirite/csv-magic"
						target="_blank"
						rel="noreferrer"
					>
						View On GitHub
					</a>
				</p>
				<ViewContainer />
			</main>
		</div>
	);
}

export default App;
