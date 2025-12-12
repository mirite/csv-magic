import type { ReactElement, ReactNode, MouseEvent } from "react";

import CloseButton from "./CloseButton.js";
import styles from "./ViewTab.module.css";

interface IProps {
	/** True represents that the current tab is active. */
	active: boolean;

	/** Whether this tab is the home tab. */
	home: boolean;

	/** The label or name to display on the tab. */
	label: ReactNode | string;

	/** The event to call when the tab is clicked on. */
	onClick: (e: MouseEvent) => unknown;

	/** The event to call when the tabs close button is clicked. */
	onClose: (e: MouseEvent) => unknown;
}

/**
 * A tab in the app representing an open file.
 *
 * @param props The properties of the tab.
 * @returns The view tab component.
 */
function ViewTab(props: IProps): ReactElement {
	const { active, home, label, onClick, onClose } = props;

	const titleClass =
		(home ? styles.homeButton : styles.titleButton) +
		(active ? " " + styles.active : "");

	return (
		<li className={styles.navItem}>
			<button
				aria-current="page"
				className={titleClass}
				onClick={onClick}
				type={"button"}
			>
				{label}
			</button>
			{home === false && <CloseButton active={active} onClose={onClose} />}
		</li>
	);
}

export default ViewTab;
