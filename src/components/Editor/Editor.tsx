import React, { createContext, useState } from "react";
import Chrome from "../Chrome/Chrome";
import Table from "../Table/Table";
import Sorting from "modules/sorting";
import { IActiveModal, IFile, IFileHistory, IRow, ISorts, ITable } from "types";

import { deleteRow, duplicateRow } from "modules/row-actions";

interface IProps {
  file: IFile;
  onChange: (table: ITable, sorts: ISorts, history: IFileHistory) => void;
}

export type ModalContextType = {
  setActiveModal: (modal: IActiveModal) => void;
  table: ITable;
  onClose: (changedTable?: ITable) => void;
};

export let ModalContext: ReturnType<typeof createContext<ModalContextType>>;

function Editor(props: IProps) {
  const { file, onChange } = props;
  const [activeModal, setActiveModal] = useState<undefined | IActiveModal>(
    undefined
  );

  const handleSort = (columnID: string) => {
    const { table, activeSorts } = file;

    const newSorts = Sorting.setSort(activeSorts, columnID);

    const newData = Sorting.applySorting(table, newSorts);
    setCoreState(newData, newSorts);
  };

  const handleModalClose = (changedTable?: ITable) => {
    if (changedTable) {
      handleTableChange(changedTable);
    }
    setActiveModal(undefined);
  };

  const handleTableChange = (changedTable: ITable) => {
    const { activeSorts } = file;
    setCoreState(changedTable, activeSorts);
  };

  const handleRowAction = (action: string, row: IRow) => {
    const { table, activeSorts } = file;
    if (action === "delete") {
      const newTable = deleteRow(table, row);
      setCoreState(newTable, activeSorts);
    } else if (action === "duplicate") {
      const newTable = duplicateRow(table, row);
      setCoreState(newTable, activeSorts);
    }
  };

  const setCoreState = (newTable: ITable, newSorts: ISorts) => {
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
        onTableChange={(e: ITable) => handleTableChange(e)}
      />
      <Table
        data={table}
        onSort={(e: string) => handleSort(e)}
        onTableChange={(e: ITable) => handleTableChange(e)}
        onRowAction={(action, row) => handleRowAction(action, row)}
        activeSorts={activeSorts}
      />
      {activeModal}
    </ModalContext.Provider>
  );
}

export default Editor;
