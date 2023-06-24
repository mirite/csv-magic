import React, { useState } from "react";
import TableHeadings from "./table-parts/TableHeadings/TablesHeadings";
import Row from "./table-parts/Row/Row";
import { updateCell } from "modules/editing";
import { ICell, IRow, ISorts, ITable } from "types";
import styles from "components/Table/Table.module.css";

interface IProps {
  /**
   * The data from the file that was opened.
   */
  data: ITable;
  onSort: (columnID: string) => void;
  onTableChange: (t: ITable) => void;
  onRowAction: (action: string, row: IRow) => void;
  activeSorts: ISorts;
}

const Table: React.FC<IProps> = (props) => {
  const { data, activeSorts, onSort, onRowAction } = props;
  const [activeCell, setActiveCell] = useState(data.firstCellId);

  const handleCellChange = (changedCell: ICell, newValue: string) => {
    const newCell = { ...changedCell };
    newCell.value = newValue;
    const newData = updateCell(data, newCell);
    props.onTableChange(newData);
  };

  const handleActiveCellChange = (e: React.MouseEvent) => {
    const { target } = e;
    const { dataset } = target as HTMLElement;
    if (dataset && dataset.id) {
      setActiveCell(dataset.id);
    }
  };

  return (
    <div className={styles.container}>
      <table>
        <TableHeadings
          TablePart="thead"
          table={data}
          activeSorts={activeSorts}
          onSort={(columnID: string) => onSort(columnID)}
        />
        <tbody onClick={(e) => handleActiveCellChange(e)}>
          {data.contents.map((row) => (
            <Row
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
          onSort={(columnID: string) => onSort(columnID)}
        />
      </table>
    </div>
  );
};

export default Table;
