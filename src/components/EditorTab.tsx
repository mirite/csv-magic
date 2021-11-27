

import React, { Component } from 'react';

interface IProps {
	name: string;
	active: boolean;
	onClick: () => void;
}

class EditorTab extends Component<IProps> {
	render() {
		const { name, active } = this.props;
		const classList = 'nav-link' + (active ? ' active' : '');
		return (
			<li className="nav-item">
				<a className={classList} aria-current="page" href="#" onClick={(e)=> this.handleClick(e)}>{name}</a>
			</li>
		);
	}
	handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
		e.preventDefault();
		this.props.onClick()
	}
}

export default EditorTab;