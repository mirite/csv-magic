import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowsAltV,
	faArrowUp,
	faArrowDown,
	faFilter,
	faFill,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/table/table-parts/TableHeading.module.css';

interface HeadingsProps {
	fieldName: string;
	onShowFilter: Function;
	onShowFindAndReplace: Function;
	onSort: Function;
	activeSorts: Array<[string, boolean]>;
}

const TableHeading: FunctionComponent<HeadingsProps> = (props) => {
	const { fieldName: key } = props;
	const getSortStateIcon = () => {
		const sort = props.activeSorts.find((e) => e[0] === key);
		if (!sort) return faArrowsAltV;
		if (sort[1]) return faArrowUp;
		return faArrowDown;
	};

	return (
		<th scope="col" className={styles.cell} key={key}>
			<div className={styles.container}>
				<span className={styles.label}>{key}</span>
				<div className={styles.actions}>
					<button
						className={styles.button}
						onClick={() => props.onShowFindAndReplace(key)}
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					<button
						className={styles.button}
						onClick={() => props.onShowFilter(key)}
					>
						<FontAwesomeIcon icon={faFilter} />
					</button>
					<button
						className={styles.button}
						onClick={() => props.onSort(key)}
					>
						<FontAwesomeIcon icon={getSortStateIcon()} />
					</button>
				</div>
			</div>
		</th>
	);
};

export default TableHeading;
