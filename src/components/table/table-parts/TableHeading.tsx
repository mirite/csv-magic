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

interface HeadingsProps {
	fieldName: string;
	onSetActiveModal: (arg0: string, column: string) => any;
	onSort: Function;
	activeSorts: Array<[string, boolean]>;
}

const TableHeading: FunctionComponent<HeadingsProps> = (props) => {
	const { fieldName: key, onSetActiveModal } = props;
	const getSortStateIcon = () => {
		const sort = props.activeSorts.find((e) => e[0] === key);
		if (!sort) return faArrowsAltV;
		if (sort[1]) return faArrowUp;
		return faArrowDown;
	};

	return (
		<th scope="col" className={styles.cell} key={key}>
			<div className={styles.container}>
				<div>
					<span className={styles.label}>{key}</span>
					<FontAwesomeIcon
						className={styles.editIcon}
						icon={faEdit}
						onClick={() => onSetActiveModal('renameColumn', key)}
						title="Rename Column"
					/>
				</div>
				<div className={styles.actions}>
					<button
						className={styles.button}
						onClick={() => onSetActiveModal('findAndReplace', key)}
						title="Find and Replace in Column"
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					<button
						className={styles.button}
						onClick={() => onSetActiveModal('filter', key)}
						title="Filter Column"
					>
						<FontAwesomeIcon icon={faFilter} />
					</button>
					<button
						className={styles.button}
						onClick={() => props.onSort(key)}
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
