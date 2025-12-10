import type { ReactElement } from "react";
import React from "react";

import styles from "./ViewTab.module.css";

type Props = {
	active: boolean;
	onClose: () => void;
};

/**
 * A close button for a tab.
 *
 * @param props The properties of the close button.
 * @returns The close button component.
 */
function CloseButton(props: Props): ReactElement {
	const { active, onClose } = props;
	const closeClass = styles.closeButton + (active ? " " + styles.active : "");
	return (
		<button className={closeClass} onClick={() => onClose()} type={"button"}>
			X
		</button>
	);
}

export default CloseButton;
