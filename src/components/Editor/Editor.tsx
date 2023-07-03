import React, { createContext, useState } from "react";
import Chrome from "../Chrome/Chrome";
import TableComponent from "../Table/TableComponent";
import Sorting from "modules/sorting";
import { Modal, Row, Sorts, Table } from "types";

import { deleteRow, duplicateRow } from "modules/row-actions";
import { useFileStore } from "modules/useFileStore";

export type ModalContextType = {
  setActiveModal: (modal: Modal) => void;
  table: Table;
  onClose: (changedTable?: Table) => void;
};

export let ModalContext: ReturnType<typeof createContext<ModalContextType>>;

function Editor() {
  const { currentFile, updateCurrentFile } = useFileStore();
  const file = currentFile();
  if (!file) return <>No File Loaded</>;
  const [activeModal, setActiveModal] = useState<undefined | Modal>(undefined);

  const handleSort = (columnID: number) => {
    const { table, activeSorts } = file;

    const newSorts = Sorting.setSort(activeSorts, columnID);

    const newData = Sorting.applySorting(table, newSorts);
    setCoreState(newData, newSorts);
  };

  const handleModalClose = (changedTable?: Table) => {
    console.log(changedTable);
    if (changedTable) {
      handleTableChange(changedTable);
    }
    setActiveModal(undefined);
  };

  const handleTableChange = (changedTable: Table) => {
    const { activeSorts } = file;
    setCoreState(changedTable, activeSorts);
  };

  const handleRowAction = (action: string, row: Row) => {
    const { table, activeSorts } = file;
    if (action === "delete") {
      const newTable = deleteRow(table, row);
      setCoreState(newTable, activeSorts);
    } else if (action === "duplicate") {
      const newTable = duplicateRow(table, row);
      setCoreState(newTable, activeSorts);
    }
  };

  const setCoreState = (newTable: Table, newSorts: Sorts) => {
    const { table, history } = file;
    const newHistory = [...history, table];
    updateCurrentFile(newTable, newSorts, newHistory);
  };

  const { table, activeSorts } = file;

  const modalContext = { setActiveModal, onClose: handleModalClose, table };
  ModalContext = createContext<ModalContextType>(modalContext);
  return (
    <ModalContext.Provider value={modalContext}>
      <Chrome
        editorState={file}
        onTableChange={(e: Table) => handleTableChange(e)}
      />
      <TableComponent
        data={table}
        onSort={(e) => handleSort(e)}
        onTableChange={(e: Table) => handleTableChange(e)}
        onRowAction={(action, row) => handleRowAction(action, row)}
        activeSorts={activeSorts}
      />
      {activeModal}
    </ModalContext.Provider>
  );
}

export default Editor;
