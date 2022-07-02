import React from 'react';
import ViewContainer from './components/ViewContainer';
import styles1 from './App.css';
import styles from './styles/App.module.css';

function App() {
	return (
		<div className={styles1.App}>
			<header className={styles.header}>
				<h1>🪄CSV Magic🪄</h1>
			</header>
			<main className={styles.main}>
				<p>
					CSV Magic is a replacement for traditional spreadsheet
					software for tasks involving transforming data. This app
					takes a comma separated value file (.csv) and allows for
					sorting, filtering, and other large scale manipulations
					within one or multiple CSV files.
				</p>
				<p>
					The app runs and processes data entirely in your web browser
					with no spreadsheet data sent to the server.
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
			<footer className={styles.footer}>
				Copyright &copy; {new Date().getFullYear()}{' '}
				<a
					href="https://jesseconner.ca"
					target="_blank"
					rel="noreferrer"
				>
					Jesse Conner
				</a>
			</footer>
		</div>
	);
}

export default App;
