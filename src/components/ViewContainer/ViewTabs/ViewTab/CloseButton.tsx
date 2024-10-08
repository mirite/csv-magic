import type { ReactElement } from "react";
import React from "react";

import * as styles from "./ViewTab.module.css";

/**
 * @param props
 * @param props.active
 * @param props.onClose
 */
function CloseButton(props: {
	active: boolean;
	onClose: () => void;
}): ReactElement {
	const { active, onClose } = props;
	const closeClass = styles.closeButton + (active ? " " + styles.active : "");
	return (
		<button type={"button"} className={closeClass} onClick={() => onClose()}>
			X
		</button>
	);
}

export default CloseButton;
