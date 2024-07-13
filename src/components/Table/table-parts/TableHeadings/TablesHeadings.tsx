import React from "react";
import TableHeading from "./TableHeading/TableHeading";
import { getColumns } from "modules/access-helpers";
import type { Sorts, Table } from "types";
import IntrinsicElements = React.JSX.IntrinsicElements;

interface TableHeadingsProps {
  TablePart: keyof IntrinsicElements;
  table: Table;
  onSort: (columnID: number) => void;
  activeSorts: Sorts;
}

const TableHeadings = (props: TableHeadingsProps) => {
  const { activeSorts, table, onSort, TablePart } = props;

  return (
    <TablePart>
      <tr>
        <th />
        {getColumns(table).map((column) => (
          <TableHeading
            key={column.id}
            column={column}
            activeSorts={activeSorts}
            onSort={() => onSort(column.id)}
          />
        ))}
      </tr>
    </TablePart>
  );
};

export default TableHeadings;
