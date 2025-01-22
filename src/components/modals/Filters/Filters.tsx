import type { ReactElement } from "react";
import React, { useState } from "react";

import { getUniqueValuesInColumn } from "modules/access-helpers";
import Filtering from "modules/filtering";
import type { Column, Filter } from "types";

import type { BaseModalProps } from "../BaseModal/Modal";
import Modal from "../BaseModal/Modal";

import * as styles from "./Filters.module.css";
import FilterValue from "./FilterValue/FilterValue";

interface IProps extends BaseModalProps {
	column: Column;
}

const FiltersModal = (props: IProps): ReactElement => {
	const { column, onClose, table } = props;
	const [filterList, setFilterList] = useState<Filter>({ column, values: [] });

	const handleChange = (valueToToggle: string, newStatus: boolean): void => {
		const oldFilterList = filterList.values;

		const newFilterList: Filter = { column, values: [] };

		if (!newStatus) {
			newFilterList.values = oldFilterList.filter(
				(existingValue) => existingValue !== valueToToggle,
			);
		} else {
			const existingFilter = oldFilterList.find(
				(existingValue) => existingValue === valueToToggle,
			);

			if (existingFilter) {
				return;
			}

			newFilterList.values = [...oldFilterList, valueToToggle];
		}

		setFilterList(newFilterList);
	};

	const handleApply = (): void => {
		const newTable = Filtering.applyFilters(table, filterList);
		onClose(newTable);
	};

	const invertSelection = (): void => {
		const allValues = getUniqueValuesInColumn(table, column.id);
		const oldActiveValues = filterList.values;
		const values = allValues
			.map((item) => item[0])
			.filter((item) => !oldActiveValues.includes(item));
		const newFilterList: Filter = { column, values };
		setFilterList(newFilterList);
	};

	const options: React.ComponentProps<typeof Modal> = {
		title: "Filter",
		applyText: "Filter",
		onApply: handleApply,
		isValid: filterList.values.length > 0,
		...props,
	};

	return (
		<Modal {...options}>
			<ul className={styles.list}>
				{getUniqueValuesInColumn(table, column.id).map((pair) => (
					<FilterValue
						key={pair[0]}
						value={pair[0]}
						count={pair[1]}
						checked={filterList.values.includes(pair[0])}
						onChange={(value: string, status: boolean) =>
							handleChange(value, status)
						}
					/>
				))}
			</ul>
			<button
				type={"button"}
				onClick={invertSelection}
				className={styles.button}
			>
				Invert Selection
			</button>
		</Modal>
	);
};

export default FiltersModal;
