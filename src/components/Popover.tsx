import React, { Component } from 'react';

interface IProps {
	title: string;
	onClose: () => void;
	onApply: () => void;
}

abstract class Popover extends Component<IProps> {
	abstract getContent(): JSX.Element;
	render() {
		return (
			<div className="modal" style={{display: 'block'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">
								{this.props.title}
							</h5>
							<button className="btn-close" onClick={this.props.onClose}></button>
						</div>
						<div className="modal-body">
							{this.getContent()}
						</div>
						<div className="modal-footer">
							<button className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
							<button className="btn btn-primary" onClick={this.props.onApply}>Apply</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Popover;