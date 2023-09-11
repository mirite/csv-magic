import React, { useState } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import { Column } from "types";
import styles from "./RemoveColumnsModal.module.css";
import { getColumns } from "modules/access-helpers";
import ColumnValue from "./ColumnValue/ColumnValue";
import { removeColumns } from "modules/editing";

const RemoveColumnsModal = (props: BaseModalProps) => {
  const { table, onClose } = props;
  const columns = getColumns(table);
  const [columnsState, setColumnsState] = useState<Array<[Column, boolean]>>(
    columns.map((label) => [label, false]),
  );

  const handleChange = (column: Column, status: boolean): void => {
    const newColumns = [...columnsState];
    const index = newColumns.findIndex((pair) => pair[0].id === column.id);
    if (index !== -1) {
      newColumns[index][1] = status;
      setColumnsState(newColumns);
    }
  };

  const getColumnsToDelete = () => {
    return columnsState.filter((pair) => pair[1]).map((pair) => pair[0]);
  };

  const handleApply = () => {
    const columnsToDelete = getColumnsToDelete();
    const newTable = removeColumns(table, columnsToDelete);
    onClose(newTable);
  };

  const options: React.ComponentProps<typeof Modal> = {
    title: "Remove Columns",
    applyText: "Remove Selected Columns",
    onApply: handleApply,
    isValid: getColumnsToDelete().length > 0,
    ...props,
  };

  return (
    <Modal {...options}>
      <ul className={styles.list}>
        {columnsState.map((pair) => (
          <ColumnValue
            key={pair[0].id}
            value={pair[0]}
            onChange={(value: Column, status: boolean) =>
              handleChange(value, status)
            }
          />
        ))}
      </ul>
    </Modal>
  );
};

export default RemoveColumnsModal;
