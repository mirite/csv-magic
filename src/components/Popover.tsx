import React, { Component } from 'react';

export interface PopoverProps {
	/**
	 * The title of the popover.
	 */
	title: string;

	/**
	 * The event handler for when the popover is closed.
	 */
	onClose: () => void;

	/**
	 * The event handler for when the popover has apply clicked.
	 */
	onApply: () => void;
}

/**
 * A modal to show on top of the table with different options to select.
 */
abstract class Popover<P extends PopoverProps> extends Component<P> {
	/**
	 * A function to get the inner content of the popover.
	 */
	abstract getContent(): JSX.Element;
	render() {
		return (
			<div className="modal" style={{ display: 'block' }}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{this.props.title}</h5>
							<button
								className="btn-close"
								onClick={this.props.onClose}
							></button>
						</div>
						<div className="modal-body">{this.getContent()}</div>
						<div className="modal-footer">
							<button
								className="btn btn-secondary"
								onClick={this.props.onClose}
							>
								Close
							</button>
							<button
								className="btn btn-primary"
								onClick={this.props.onApply}
							>
								Apply
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Popover;
