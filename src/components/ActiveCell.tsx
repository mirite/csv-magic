import React, { ChangeEvent, Component } from 'react';
import Cell, { IProps } from './Cell';



class ActiveCell extends Cell {

	constructor(props: IProps) {
		super(props);
		this.state = { value: this.props.data.value };
	}

	componentDidUpdate(prevProps: IProps) {
		if (this.props !== prevProps) {
			this.setState( { value: this.props.data.value });
		}
	}

	update(e: ChangeEvent) {
		const newValue = (e.currentTarget as HTMLInputElement).value;
		this.setState({value: newValue});
	}
	
	render() {
		return (
			<td style={this.containerStyle}>
				<input type='text' value={ this.state.value } onChange={(e) => this.update(e)}style={ this.inputStyle } />
			</td>
		);
	}
}

export default ActiveCell;