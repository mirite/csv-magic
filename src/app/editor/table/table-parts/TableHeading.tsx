import {
	faArrowsAltV,
	faArrowUp,
	faArrowDown,
	faFilter,
	faEdit,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import type { ReactElement } from "react";
import type { Column, Sorts } from "@/types.js";

import { modals } from "@/app/editor/modals/index.js";

import styles from "./TableHeading.module.css";
import { ModalContext } from "@/lib/index.js";

interface HeadingsProps {
	activeSorts: Sorts;
	column: Column;
	onSort: () => void;
}

const TableHeading = (props: HeadingsProps): ReactElement => {
	const { column } = props;
	const { onClose, setActiveModal, table } = useContext(ModalContext);
	const getSortStateIcon = () => {
		const sort = props.activeSorts.find((e) => e[0] === column.id);
		if (!sort) {
			return faArrowsAltV;
		}
		if (sort[1]) {
			return faArrowUp;
		}
		return faArrowDown;
	};

	return (
		<th className={styles.cell} key={column.id} scope="col">
			<div className={styles.container}>
				<div>
					<span className={styles.label}>{column.label}</span>
					<FontAwesomeIcon
						className={styles.editIcon}
						icon={faEdit}
						onClick={() =>
							setActiveModal(
								<modals.RenameColumn
									column={column}
									onClose={onClose}
									table={table}
								/>,
							)
						}
						title="Rename Column"
					/>
				</div>
				<div className={styles.actions}>
					<button
						className={styles.button}
						onClick={() =>
							setActiveModal(
								<modals.FindAndReplace
									column={column}
									onClose={onClose}
									table={table}
								/>,
							)
						}
						title="Find and Replace in Column"
						type={"button"}
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
					<button
						className={styles.button}
						onClick={() =>
							setActiveModal(
								<modals.Filters
									column={column}
									onClose={onClose}
									table={table}
								/>,
							)
						}
						title="Filter Column"
						type={"button"}
					>
						<FontAwesomeIcon icon={faFilter} />
					</button>
					<button
						className={styles.button}
						onClick={props.onSort}
						title="Sort on Column"
						type={"button"}
					>
						<FontAwesomeIcon icon={getSortStateIcon()} />
					</button>
				</div>
			</div>
		</th>
	);
};

export default TableHeading;
