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
import { ICell } from '../types';
import styles from '../styles/TableHeading.module.css';

interface HeadingsProps {
	exampleCell: ICell;
	onShowFilter: Function;
	onSort: Function;
	activeSorts: Array<[string, boolean]>;
}

const TableHeading: FunctionComponent<HeadingsProps> = (props) => {
	const cell = props.exampleCell;
	const { key } = cell;

	const getSortStateIcon = () => {
		const sort = props.activeSorts.find((e) => e[0] === key);
		if (!sort) return faArrowsAltV;
		if (sort[1]) return faArrowUp;
		return faArrowDown;
	};

	return (
		<th scope="col" key={cell.key}>
			<div className={styles.container}>
				<span className="m-1">
					<strong>{key}</strong>
				</span>
				<div className={styles.actions}>
					<button className="btn btn-primary m-1">
						<FontAwesomeIcon icon={faSearch} />
					</button>
					<button
						className="btn btn-primary m-1"
						onClick={() => props.onShowFilter(key)}
					>
						<FontAwesomeIcon icon={faFilter} />
					</button>
					<button
						className="btn btn-primary m-1"
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
