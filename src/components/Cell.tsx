import React, { ChangeEvent, Component } from 'react';
import { ICell } from '../types';

export interface IProps {
	data: ICell;
}

export interface IState {
	value: string;
}

class Cell extends Component<IProps, IState> {
	inputStyle:React.CSSProperties = { width: '100%', height: '100%', textAlign:'center'};
	containerStyle: React.CSSProperties = { };
	constructor(props: IProps) {
		super(props);
		
	}

	render() {
		return (
			<td style={this.containerStyle}>
				<span style={this.inputStyle}>{this.props.data.value }</span>
			</td>
		);
	}
}

export default Cell;