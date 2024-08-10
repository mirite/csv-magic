import type { PropsWithChildren, ReactElement } from "react";
import React from "react";
import { Cell } from "types";

import styles from "./Cell.module.css";

type IProps = PropsWithChildren & Cell;

/**
 * A single cell within a Table.
 *
 * @param props
 */
const Cell = (props: IProps): ReactElement => {
	const { children, id } = props;

	return (
		<td className={styles.container} data-id={id}>
			{children}
		</td>
	);
};

export default Cell;
