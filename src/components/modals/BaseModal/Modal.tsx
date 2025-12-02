import type { PropsWithChildren, ReactElement } from "react";
import React from "react";

import type { Table } from "types";

import * as styles from "./Modal.module.css";

export type BaseModalProps = {
	onClose: (changedTable?: Table) => void;
	table: Table;
};

interface Props extends BaseModalProps, PropsWithChildren {
	applyText?: string;
	isValid?: boolean;
	onApply: () => void;
	title?: string;
}

const Modal = (props: Props): ReactElement => {
	const {
		applyText = "Apply",
		children,
		isValid = true,
		onApply,
		onClose,
		title = "",
	} = props;
	return (
		<div className="modal" style={{ display: "block" }}>
			<div className={styles.container}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							className="btn-close"
							onClick={() => onClose()}
							type={"button"}
						/>
					</div>
					<div className="modal-body">{children}</div>
					<div className="modal-footer">
						<button
							className="btn btn-secondary"
							onClick={() => onClose()}
							type={"button"}
						>
							Close
						</button>
						<button
							className="btn btn-primary"
							disabled={!isValid}
							onClick={onApply}
							type={"button"}
						>
							{applyText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
