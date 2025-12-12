import { getUniqueValuesInColumn, Filtering } from "@/lib/index.js";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { Filter } from "@/types.js";

import type { ChildModalPropsWithColumn } from "@/app/editor/modals/index.js";
import { Modal } from "@/app/editor/modals/index.js";

import styles from "./Filters.module.css";
import FilterValue from "./FilterValue/FilterValue.js";

export const Filters = (props: ChildModalPropsWithColumn): ReactElement => {
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
		...props,
		applyText: "Filter",
		isValid: filterList.values.length > 0,
		onApply: handleApply,
		title: "Filter",
	};

	return (
		<Modal {...options}>
			<ul className={styles.list}>
				{getUniqueValuesInColumn(table, column.id).map((pair) => (
					<FilterValue
						checked={filterList.values.includes(pair[0])}
						count={pair[1]}
						key={pair[0]}
						onChange={(value: string, status: boolean) =>
							handleChange(value, status)
						}
						value={pair[0]}
					/>
				))}
			</ul>
			<button
				className={styles.button}
				onClick={invertSelection}
				type={"button"}
			>
				Invert Selection
			</button>
		</Modal>
	);
};
