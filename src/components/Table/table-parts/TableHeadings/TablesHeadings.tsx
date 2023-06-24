import React from "react";
import TableHeading from "./TableHeading/TableHeading";
import { getColumns } from "modules/access-helpers";
import { availableModal, IColumn, ISorts, ITable } from "types";
import IntrinsicElements = React.JSX.IntrinsicElements;

interface TableHeadingsProps {
  TablePart: keyof IntrinsicElements;
  table: ITable;
  onSetActiveModal: (arg0: availableModal, column: IColumn) => void;
  onSort: (columnID: string) => void;
  activeSorts: ISorts;
}

const TableHeadings = (props: TableHeadingsProps) => {
  const { activeSorts, table, onSort, onSetActiveModal, TablePart } = props;

  return (
    <TablePart>
      <tr>
        <th />
        {getColumns(table).map((column) => (
          <TableHeading
            key={column.id}
            column={column}
            activeSorts={activeSorts}
            onSetActiveModal={(t: availableModal) =>
              onSetActiveModal(t, column)
            }
            onSort={() => onSort(column.id)}
          />
        ))}
      </tr>
    </TablePart>
  );
};

export default TableHeadings;
