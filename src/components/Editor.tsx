import React, { Component } from 'react';
import FilePane from './FilePane';

interface IProps { }

interface IState{
}
class Editor extends Component {

	render() {
		return (
			<div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1400px', overflowX: 'scroll' }}>
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">File1</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">File2</a>
					</li>
				</ul>
				<FilePane />
				<FilePane />
			</div>
		);
	}
}

export default Editor;