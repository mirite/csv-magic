import type { PropsWithChildren, ReactElement } from "react";
import type { Cell } from "@/types.js";

import styles from "./Cell.module.css";

type IProps = Pick<Cell, "id"> & PropsWithChildren;

/**
 * A single cell within a Table.
 *
 * @param props The properties of the cell.
 * @returns The cell component.
 */
export function CellComponent(props: Readonly<IProps>): ReactElement {
	const { children, id } = props;

	return (
		<td className={styles.container} data-id={id}>
			{children}
		</td>
	);
}
