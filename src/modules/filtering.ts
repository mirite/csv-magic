import { IFilter, ITable } from "types";
import { getCellValueByColumnID } from "./access-helpers";
import { cloneDeep } from "./tools";

function applyFilters(data: ITable, activeFilter: IFilter) {
  const newData = cloneDeep(data) as ITable;

  newData.contents = newData.contents.filter((row) => {
    return activeFilter.values.includes(
      getCellValueByColumnID(row, activeFilter.column.id)
    );
  });

  return newData;
}

export default {
  applyFilters,
};
