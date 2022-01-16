import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowsAltV,
	faArrowUp,
	faArrowDown,
	faFilter,
	faEdit,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/table/table-parts/TableHeading.module.css';
import { IColumn, ISorts } from 'types';

interface HeadingsProps {
	column: IColumn;
	onSetActiveModal: (arg0: string, column: IColumn) => any;
	onSort: Function;
	activeSorts: ISorts;
}

const TableHeading: FunctionComponent<HeadingsProps> = (props) => {
	const { column, onSetActiveModal } = props;
	const getSortStateIcon = () => {
		const sort = props.activeSorts.find((e) => e[0] === column.id);
		if (!sort) return faArrowsAltV;
		if (sort[1]) return faArrowUp;
		return faArrowDown;
	};

	return (
		<th scope="col" className={styles.cell} key={column.id}>
			<div className={styles.container}>
				<div>
					<span className={styles.label}>{column.label}</span>
					<FontAwesomeIcon
						className={styles.editIcon}
						icon={faEdit}
						onClick={() => onSetActiveModal('renameColumn', column)}
						title="Rename Column"
					/>
				</div>
				<div className={styles.actions}>
					<button
						className={styles.button}
						onClick={() =>
							onSetActiveModal('findAndReplace', column)
						}
						title="Find and Replace in Column"
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					<button
						className={styles.button}
						onClick={() => onSetActiveModal('filter', column)}
						title="Filter Column"
					>
						<FontAwesomeIcon icon={faFilter} />
					</button>
					<button
						className={styles.button}
						onClick={() => props.onSort(column)}
						title="Sort on Column"
					>
						<FontAwesomeIcon icon={getSortStateIcon()} />
					</button>
				</div>
			</div>
		</th>
	);
};

export default TableHeading;
