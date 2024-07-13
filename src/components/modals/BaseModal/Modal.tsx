import type { PropsWithChildren, ReactElement } from "react";
import React from "react";
import styles from "./Modal.module.css";
import type { Table } from "types";

interface Props extends BaseModalProps, PropsWithChildren {
  title?: string;
  applyText?: string;
  onApply: () => void;
  isValid?: boolean;
}

export type BaseModalProps = {
  table: Table;
  onClose: (changedTable?: Table) => void;
};

const Modal = (props: Props): ReactElement => {
  const {
    title = "",
    children,
    applyText = "Apply",
    onApply,
    onClose,
    isValid = true,
  } = props;
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className={styles.container}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type={"button"}
              className="btn-close"
              onClick={() => onClose()}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type={"button"}
              className="btn btn-secondary"
              onClick={() => onClose()}
            >
              Close
            </button>
            <button
              type={"button"}
              className="btn btn-primary"
              onClick={onApply}
              disabled={!isValid}
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
