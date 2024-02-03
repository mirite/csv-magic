import React, { useCallback } from "react";
import RowComponent from "./table-parts/Row/Row";
import { updateCell } from "modules/editing";
import { Cell, Row, Table } from "types";
import styles from "components/Table/Table.module.css";
import { useFileStore } from "../../modules/useFileStore";
import { RowAction } from "../Editor/Editor";
import { getColumns } from "../../modules/access-helpers";
import TableHeading from "./table-parts/TableHeadings/TableHeading/TableHeading";

interface IProps {
  onSort: (columnID: number) => void;
  onTableChange: (t: Table) => void;
  onTableBodyClick: (e: React.MouseEvent<HTMLTableSectionElement>) => void;
  onRowAction: (row: Row, action: RowAction) => void;
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

  const columns = getColumns(data);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th />
            {columns.map((column) => (
              <TableHeading
                key={column.id}
                column={column}
                activeSorts={activeSorts}
                onSort={() => onSort(column.id)}
              />
            ))}
          </tr>
        </thead>
        <tbody onClick={onTableBodyClick}>
          {data.contents.map((row) => (
            <RowComponent
              key={row.id}
              data={row}
              activeCell={activeCell}
              onCellChange={handleCellChange}
              onAction={onRowAction}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th />
            {columns.map((column) => (
              <TableHeading
                key={column.id}
                column={column}
                activeSorts={activeSorts}
                onSort={() => onSort(column.id)}
              />
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableComponent;
