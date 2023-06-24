import React, { useCallback, useState } from 'react';
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings";
import RowComponent from "./table-parts/Row/Row";
import { updateCell } from "modules/editing";
import { Cell, Row, Sorts, Table } from "types";
import styles from "components/Table/Table.module.css";

interface IProps {
  /**
   * The data from the file that was opened.
   */
  data: Table;
  onSort: (columnID: number) => void;
  onTableChange: (t: Table) => void;
  onRowAction: (action: string, row: Row) => void;
  activeSorts: Sorts;
}

const TableComponent = (props: IProps) => {
  const { data, activeSorts, onSort, onRowAction, onTableChange } = props;
  const [activeCell, setActiveCell] = useState(data.firstCellId);

  const handleCellChange = useCallback((changedCell: Cell, newValue: string) => {
    const newCell = { ...changedCell };
    newCell.value = newValue;
    const newData = updateCell(data, newCell);
    onTableChange(newData);
  },[]);

  const handleActiveCellChange = useCallback((e: React.MouseEvent) => {
    const { target } = e;
    const { dataset } = target as HTMLElement;
    if (dataset && dataset.id) {
      setActiveCell(dataset.id);
    }
  },[]);

  return (
    <div className={styles.container}>
      <table>
        <TableHeadings
          TablePart="thead"
          table={data}
          activeSorts={activeSorts}
          onSort={(columnID) => onSort(columnID)}
        />
        <tbody onClick={(e) => handleActiveCellChange(e)}>
          {data.contents.map((row) => (
            <RowComponent
              key={row.id}
              {...row}
              activeCell={activeCell}
              onCellChange={(e, newValue) => handleCellChange(e, newValue)}
              onAction={(action: string) => onRowAction(action, row)}
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
