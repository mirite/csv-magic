import {
	faArrowUp,
	faArrowDown,
	faArrowCircleDown,
	faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ReorderColumnsModal.module.css";
import type { FunctionComponent } from "react";
import type { Column } from "@/types.js";

interface ColumnPositionProps {
	onMove: (distance: number) => void;
	toEnd: number;
	toStart: number;
	value: Column;
}

const ColumnPosition: FunctionComponent<ColumnPositionProps> = (props) => {
	const getLetterEquivalent = (index: number): string => {
		let prefix = "";
		if (index > 25) {
			prefix = String.fromCharCode(64 + index / 26);
		}

		return prefix + String.fromCharCode(65 + (index % 26));
	};

	const { toEnd, toStart, value } = props;
	const { label, position } = value;

	return (
		<>
			<div className={styles.label}>{getLetterEquivalent(position)}</div>
			<button
				className={styles.button}
				disabled={toEnd === 0}
				onClick={() => {
					props.onMove(toEnd);
				}}
				type={"button"}
			>
				<FontAwesomeIcon icon={faArrowCircleDown} />
			</button>
			<button
				className={styles.button}
				disabled={toEnd === 0}
				onClick={() => {
					props.onMove(1);
				}}
				type={"button"}
			>
				<FontAwesomeIcon icon={faArrowDown} />
			</button>
			<div className={styles.label}>{label}</div>
			<button
				className={styles.button}
				disabled={toStart === 0}
				onClick={() => {
					props.onMove(-1);
				}}
				type={"button"}
			>
				<FontAwesomeIcon icon={faArrowUp} />
			</button>
			<button
				className={styles.button}
				disabled={toStart === 0}
				onClick={() => {
					props.onMove(toStart);
				}}
				type={"button"}
			>
				<FontAwesomeIcon icon={faArrowCircleUp} />
			</button>
		</>
	);
};

export default ColumnPosition;
