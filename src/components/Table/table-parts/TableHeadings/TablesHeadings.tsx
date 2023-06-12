import React, { FunctionComponent } from "react";
import TableHeading from "./TableHeading/TableHeading";
import { getColumns } from "modules/access-helpers";
import { availableModal, IColumn, ISorts, ITable } from "types";

interface TableHeadingsProps {
  table: ITable;
  onSetActiveModal: (arg0: availableModal, column: IColumn) => void;
  onSort: Function;
  activeSorts: ISorts;
}

const TableHeadings: FunctionComponent<TableHeadingsProps> = (props) => {
  const cells = [];
  const { activeSorts, table, onSort, onSetActiveModal } = props;

  for (const column of getColumns(table)) {
    cells.push(
      <TableHeading
        key={column.id}
        column={column}
        activeSorts={activeSorts}
        onSetActiveModal={(t: availableModal) => onSetActiveModal(t, column)}
        onSort={() => onSort(column.id)}
      />
    );
  }
  return (
    <tr>
      <th />
      {cells}
    </tr>
  );
};

export default TableHeadings;
