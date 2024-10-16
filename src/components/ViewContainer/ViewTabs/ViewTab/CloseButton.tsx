import type { ReactElement } from "react";
import React from "react";

import * as styles from "./ViewTab.module.css";

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
		<button type={"button"} className={closeClass} onClick={() => onClose()}>
			X
		</button>
	);
}

export default CloseButton;
