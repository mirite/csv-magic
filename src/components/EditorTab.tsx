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
	handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		this.props.onClick();
	}
}

export default EditorTab;
