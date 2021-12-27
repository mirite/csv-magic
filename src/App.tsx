import React from 'react';
import './App.css';
import Editor from './components/Editor';
import styles from './styles/App.module.css';

function App() {
	return (
		<div className="App">
			<header className={styles.header}>
				<h1>CSV Magic</h1>
			</header>
			<main className={styles.main}>
				<Editor />
			</main>
		</div>
	);
}

export default App;
