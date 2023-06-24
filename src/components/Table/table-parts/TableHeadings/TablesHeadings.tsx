import React from "react";
import TableHeading from "./TableHeading/TableHeading";
import { getColumns } from "modules/access-helpers";
import { ISorts, ITable } from 'types';
import IntrinsicElements = React.JSX.IntrinsicElements;

interface TableHeadingsProps {
  TablePart: keyof IntrinsicElements;
  table: ITable;
  onSort: (columnID: string) => void;
  activeSorts: ISorts;
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
