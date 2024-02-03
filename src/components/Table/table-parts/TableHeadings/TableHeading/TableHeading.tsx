import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltV, faArrowUp, faArrowDown, faFilter, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./TableHeading.module.css";
import { Column, Sorts } from "types";
import RenameColumnModal from "../../../../modals/RenameColumn/RenameColumn";
import { ModalContext } from "../../../../Editor/Editor";
import FindAndReplaceModal from "../../../../modals/FindAndReplace/FindAndReplace";
import FiltersModal from "../../../../modals/Filters/Filters";
interface HeadingsProps {
  column: Column;
  onSort: () => void;
  activeSorts: Sorts;
}

const TableHeading = (props: HeadingsProps) => {
  const { column } = props;
  const { setActiveModal, table, onClose } = useContext(ModalContext);
  let sortStateIcon;
  const sort = props.activeSorts.find((e) => e[0] === column.id);
  if (!sort) {
    sortStateIcon = faArrowsAltV;
  } else if (sort[1]) {
    sortStateIcon = faArrowUp;
  } else {
    sortStateIcon = faArrowDown;
  }

  return (
    <th scope="col" className={styles.cell} key={column.id}>
      <div className={styles.container}>
        <div>
          <span className={styles.label}>{column.label}</span>
          <FontAwesomeIcon
            className={styles.editIcon}
            icon={faEdit}
            onClick={() => setActiveModal(<RenameColumnModal column={column} onClose={onClose} table={table} />)}
            title="Rename Column"
          />
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => setActiveModal(<FindAndReplaceModal column={column} table={table} onClose={onClose} />)}
            title="Find and Replace in Column"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className={styles.button}
            onClick={() => setActiveModal(<FiltersModal column={column} table={table} onClose={onClose} />)}
            title="Filter Column"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button className={styles.button} onClick={() => props.onSort()} title="Sort on Column">
            <FontAwesomeIcon icon={sortStateIcon} />
          </button>
        </div>
      </div>
    </th>
  );
};

export default TableHeading;
