import React, { Component } from 'react';
import FilePane from './FilePane';


class Editor extends Component {

	render() {
		return (
			<div style={{marginLeft:'auto', marginRight:'auto', maxWidth:'1400px',overflowX: 'scroll'}}>
				<FilePane />
				<FilePane/>
			</div>
		);
	}
}

export default Editor;