import React, { useCallback } from "react";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings";
import RowComponent from "./table-parts/Row/Row";
import { updateCell } from "modules/editing";
import type { Cell, Row, Table } from "types";
import styles from "components/Table/Table.module.css";
import { useFileStore } from "../../modules/useFileStore";
import type { RowAction } from "../Editor/Editor";

interface IProps {
  onSort: (columnID: number) => void;
  onTableChange: (t: Table) => void;
  onTableBodyClick: (e: React.MouseEvent<HTMLTableSectionElement>) => void;
  onRowAction: (action: RowAction, row: Row) => void;
  activeCell?: string;
}

const TableComponent = (props: IProps) => {
  const currentFile = useFileStore().currentFile();
  if (!currentFile) return <>No File Loaded</>;
  const { table: data, activeSorts } = currentFile;
  const { onSort, onRowAction, onTableChange, activeCell, onTableBodyClick } =
    props;

  const handleCellChange = useCallback(
    (changedCell: Cell, newValue: string) => {
      const newCell = { ...changedCell };
      newCell.value = newValue;
      const newData = updateCell(data, newCell);
      onTableChange(newData);
    },
    [],
  );

  return (
    <div className={styles.container}>
      <table>
        <TableHeadings
          TablePart="thead"
          table={data}
          activeSorts={activeSorts}
          onSort={(columnID) => onSort(columnID)}
        />
        <tbody onClick={onTableBodyClick}>
          {data.contents.map((row) => (
            <RowComponent
              key={row.id}
              {...row}
              activeCell={activeCell}
              onCellChange={(e, newValue) => handleCellChange(e, newValue)}
              onAction={(action) => onRowAction(action, row)}
            />
          ))}
        </tbody>
        <TableHeadings
          TablePart="tfoot"
          table={data}
          activeSorts={activeSorts}
          onSort={(columnID) => onSort(columnID)}
        />
      </table>
    </div>
  );
};

export default TableComponent;
