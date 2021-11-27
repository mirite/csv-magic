import React, { ChangeEvent, Component } from 'react';

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

	componentDidUpdate(prevProps: IProps) {
		if (this.props !== prevProps) {
			this.setState( { value: this.props.value });
		}
	}

	update(e: ChangeEvent) {
		const newValue = (e.currentTarget as HTMLInputElement).value;
		this.setState({value: newValue});
	}
	
	render() {
		return (
			<div style={this.containerStyle}>
				<input type='text' value={ this.state.value } onChange={(e) => this.update(e)}style={ this.inputStyle } />
			</div>
		);
	}
}

export default Cell;