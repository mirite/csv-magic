import React, { Component } from 'react';

interface IProps {
	value: string;
}

interface IState {
	value: string;
}

class Cell extends Component<IProps, IState> {
	inputStyle:React.CSSProperties = { width: '100%', height: '100%', textAlign:'center'};
	containerStyle: React.CSSProperties = { };
	constructor(props: IProps) {
		super(props);
		this.state = { value: this.props.value };
	}
	
	render() {
		return (
			<div style={this.containerStyle}>
				<input type='text' value={ this.state.value } style={ this.inputStyle } />
			</div>
		);
	}
}

export default Cell;