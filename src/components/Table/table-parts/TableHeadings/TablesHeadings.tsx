import React from "react";
import TableHeading from "./TableHeading/TableHeading";
import { getColumns } from "modules/access-helpers";
import { availableModal, IColumn, ISorts, ITable } from "types";

interface TableHeadingsProps {
  table: ITable;
  onSetActiveModal: (arg0: availableModal, column: IColumn) => void;
  onSort: (columnID: string) => void;
  activeSorts: ISorts;
}

const TableHeadings = (props: TableHeadingsProps) => {
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
