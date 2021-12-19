import React from 'react';
import './App.css';
import Editor from './components/Editor';

function App() {

	return (
		<div className="App">
			<header className="container-fluid mb-1 p-1" style={{ backgroundColor:'green', color:'white'}}>
				<h1>CSV Magic</h1>
			</header>
			<main className="container-xxl mb-1">
				<Editor />
			</main>
		</div>
	);
}

export default App;