import React, { Component } from 'react';

interface IProps {
	/**
	 * The label or name to display on the tab.
	 */
	label: string;

	/**
	 * true represents that the current tab is active.
	 */
	active: boolean;

	/**
	 * The event to call when the tab is clicked on.
	 */
	onClick: () => void;
}

/**
 * A tab in the app representing an open file.
 */
class EditorTab extends Component<IProps> {
	render() {
		const { label: name, active } = this.props;
		const classList = 'nav-link' + (active ? ' active' : '');
		return (
			<li className="nav-item">
				<button
					className={classList}
					aria-current="page"
					onClick={(e) => this.handleClick(e)}
				>
					{name}
				</button>
			</li>
		);
	}
	/**
	 * Handles clicks on a tab and passes that event back to the parent component.
	 *
	 * @param  e The click event object.
	 */
	handleClick(e: React.MouseEvent): void {
		e.preventDefault();
		this.props.onClick();
	}
}

export default EditorTab;
