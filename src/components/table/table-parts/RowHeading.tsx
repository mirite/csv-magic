import React, { FunctionComponent } from 'react';
import { IRow } from 'types';
import styles from 'styles/table/table-parts/TableHeading.module.css';

interface RowHeadingProps {
	row: IRow;
	onAction: (actionName: string) => void;
}

const RowHeading: FunctionComponent<RowHeadingProps> = (props) => {
	const { onAction } = props;
	return (
		<th scope="row" className={styles.cell}>
			<div className={styles.rowHeading}>
				<button
					className={styles.button}
					onClick={() => onAction('duplicate')}
				>
					Duplicate
				</button>
				<button
					className={styles.buttonDanger}
					onClick={() => onAction('delete')}
				>
					Delete
				</button>
			</div>
		</th>
	);
};

export default RowHeading;
