import React, { createContext, useCallback, useState } from "react";
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

const rowActions = {
  delete: deleteRow,
  duplicate: duplicateRow,
} as const;

export type RowAction = keyof typeof rowActions;
export let ModalContext: ReturnType<typeof createContext<ModalContextType>>;

/*
 *
 */
function Editor() {
  const { currentFile, updateCurrentFile } = useFileStore();
  const file = currentFile();
  if (!file) return <>No File Loaded</>;
  const { table, activeSorts, history } = file;
  const [activeModal, setActiveModal] = useState<undefined | Modal>(undefined);
  const [activeCell, setActiveCell] = useState(table.firstCellId);

  const handleTableClick = useCallback((e: React.MouseEvent<HTMLTableSectionElement>) => {
    const { target } = e;
    const { dataset } = target as HTMLElement;
    if (dataset && dataset.id) {
      setActiveCell(dataset.id);
    }
  }, []);

  const handleSort = (columnID: number) => {
    const newSorts = Sorting.setSort(activeSorts, columnID);

    const newData = Sorting.applySorting(table, newSorts);
    setCoreState(newData, newSorts);
  };

  const handleModalClose = (changedTable?: Table) => {
    if (changedTable) {
      setCoreState(changedTable);
    }
    setActiveModal(undefined);
  };

  const handleRowAction = (row: Row, action: RowAction) => {
    const newTable = rowActions[action](table, row);
    setCoreState(newTable);
  };

  const setCoreState = (newTable: Table, newSorts?: Sorts) => {
    const newHistory = [...history, table];
    updateCurrentFile(newTable, newSorts || activeSorts, newHistory);
  };

  const modalContext = { setActiveModal, onClose: handleModalClose, table };
  ModalContext = createContext<ModalContextType>(modalContext);
  return (
    <ModalContext.Provider value={modalContext}>
      <Chrome onTableChange={(e: Table) => setCoreState(e)} />
      <TableComponent
        onSort={(e) => handleSort(e)}
        onTableChange={(e: Table) => setCoreState(e)}
        onRowAction={handleRowAction}
        activeCell={activeCell}
        onTableBodyClick={handleTableClick}
      />
      {activeModal}
    </ModalContext.Provider>
  );
}

export default Editor;
