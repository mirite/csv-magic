import React, { Component } from 'react';

interface IProps {
	title: string;
	onClose: () => void;
}

class Popover extends Component<IProps> {
	getContent() {
		return <span>Please Overload Me</span>;
	}
	render() {
		return (
			<div className="modal" style={{display: 'block'}}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">
								{this.props.title}
							</h5>
							<button className="btn-close"></button>
						</div>
						<div className="modal-body">
							{this.getContent()}
						</div>
						<div className="modal-footer">
							<button className="btn btn-secondary">Close</button>
							<button className="btn btn-primary">Apply</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Popover;