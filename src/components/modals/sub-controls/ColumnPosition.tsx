import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUp,
	faArrowDown,
	faArrowCircleDown,
	faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { IColumn } from 'types';
import styles from 'styles/modals/ReorderColumnsModal.module.css';

interface ColumnPositionProps {
	value: IColumn;
	onMove: (distance: number) => void;
}

const ColumnPosition: FunctionComponent<ColumnPositionProps> = (props) => {
	const getLetterEquivalent = (index: number): string => {
		return String.fromCharCode(65 + index);
	};

	const { value } = props;
	const { label, position } = value;

	return (
		<React.Fragment>
			<div className={styles.label}>{getLetterEquivalent(position)}</div>
			<button className={styles.button}>
				<FontAwesomeIcon icon={faArrowCircleDown} />
			</button>
			<button className={styles.button}>
				<FontAwesomeIcon icon={faArrowDown} />
			</button>
			<div className={styles.label}>{label}</div>
			<button className={styles.button}>
				<FontAwesomeIcon icon={faArrowUp} />
			</button>
			<button className={styles.button}>
				<FontAwesomeIcon icon={faArrowCircleUp} />
			</button>
		</React.Fragment>
	);
};

export default ColumnPosition;
