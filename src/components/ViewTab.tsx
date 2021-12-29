import React, { Component } from 'react';
import styles from '../styles/ViewTab.module.css';

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

	/**
	 * The event to call when the tabs close button is clicked.
	 */
	onClose: () => void;

	/**
	 * Whether or not this tab is the home tab.
	 */
	home: boolean;
}

/**
 * A tab in the app representing an open file.
 */
class ViewTab extends Component<IProps> {
	closeButton() {
		const { active } = this.props;
		const closeClass =
			styles.closeButton + (active ? ' ' + styles.active : '');
		return (
			<button className={closeClass} onClick={() => this.props.onClose()}>
				X
			</button>
		);
	}
	render() {
		const { label: name, active } = this.props;
		const titleClass =
			styles.titleButton + (active ? ' ' + styles.active : '');

		return (
			<li className={styles.navItem}>
				<button
					className={titleClass}
					aria-current="page"
					onClick={(e) => this.handleClick(e)}
				>
					{name}
				</button>
				{this.props.home ? '' : this.closeButton()}
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

export default ViewTab;
