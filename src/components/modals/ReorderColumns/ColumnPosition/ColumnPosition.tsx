import {
	faArrowCircleDown,
	faArrowCircleUp,
	faArrowDown,
	faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "components/modals/ReorderColumns/ReorderColumnsModal.module.css";
import type { FunctionComponent } from "react";
import React from "react";
import type { Column } from "types";

interface ColumnPositionProps {
	value: Column;
	onMove: (distance: number) => void;
	toStart: number;
	toEnd: number;
}

const ColumnPosition: FunctionComponent<ColumnPositionProps> = (props) => {
	const getLetterEquivalent = (index: number): string => {
		let prefix = "";
		if (index > 25) {
			prefix = String.fromCharCode(64 + index / 26);
		}

		return prefix + String.fromCharCode(65 + (index % 26));
	};

	const { value, toStart, toEnd } = props;
	const { label, position } = value;

	return (
		<React.Fragment>
			<div className={styles.label}>{getLetterEquivalent(position)}</div>
			<button
				type={"button"}
				className={styles.button}
				onClick={() => {
					props.onMove(toEnd);
				}}
				disabled={toEnd === 0}
			>
				<FontAwesomeIcon icon={faArrowCircleDown} />
			</button>
			<button
				type={"button"}
				className={styles.button}
				onClick={() => {
					props.onMove(1);
				}}
				disabled={toEnd === 0}
			>
				<FontAwesomeIcon icon={faArrowDown} />
			</button>
			<div className={styles.label}>{label}</div>
			<button
				type={"button"}
				className={styles.button}
				onClick={() => {
					props.onMove(-1);
				}}
				disabled={toStart === 0}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</button>
			<button
				type={"button"}
				className={styles.button}
				onClick={() => {
					props.onMove(toStart);
				}}
				disabled={toStart === 0}
			>
				<FontAwesomeIcon icon={faArrowCircleUp} />
			</button>
		</React.Fragment>
	);
};

export default ColumnPosition;
