import React, { createContext, useState } from "react";
import Chrome from "../Chrome/Chrome";
import TableComponent from "../Table/Table";
import Sorting from "modules/sorting";
import { Modal, File, FileHistory, Row, Sorts, Table } from "types";

import { deleteRow, duplicateRow } from "modules/row-actions";

interface IProps {
  file: File;
  onChange: (table: Table, sorts: Sorts, history: FileHistory) => void;
}

export type ModalContextType = {
  setActiveModal: (modal: Modal) => void;
  table: Table;
  onClose: (changedTable?: Table) => void;
};

export let ModalContext: ReturnType<typeof createContext<ModalContextType>>;

function Editor(props: IProps) {
  const { file, onChange } = props;
  const [activeModal, setActiveModal] = useState<undefined | Modal>(undefined);

  const handleSort = (columnID: string) => {
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
    onChange(newTable, newSorts, newHistory);
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
        onSort={(e: string) => handleSort(e)}
        onTableChange={(e: Table) => handleTableChange(e)}
        onRowAction={(action, row) => handleRowAction(action, row)}
        activeSorts={activeSorts}
      />
      {activeModal}
    </ModalContext.Provider>
  );
}

export default Editor;
