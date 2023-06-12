import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAltV,
  faArrowUp,
  faArrowDown,
  faFilter,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./TableHeading.module.css";
import { availableModal, IColumn, ISorts } from "types";

interface HeadingsProps {
  column: IColumn;
  onSetActiveModal: (arg0: availableModal, column: IColumn) => any;
  onSort: Function;
  activeSorts: ISorts;
}

const TableHeading: FunctionComponent<HeadingsProps> = (props) => {
  const { column, onSetActiveModal } = props;
  const getSortStateIcon = () => {
    const sort = props.activeSorts.find((e) => e[0] === column.id);
    if (!sort) {
      return faArrowsAltV;
    }
    if (sort[1]) {
      return faArrowUp;
    }
    return faArrowDown;
  };

  return (
    <th scope="col" className={styles.cell} key={column.id}>
      <div className={styles.container}>
        <div>
          <span className={styles.label}>{column.label}</span>
          <FontAwesomeIcon
            className={styles.editIcon}
            icon={faEdit}
            onClick={() => onSetActiveModal("RenameColumn", column)}
            title="Rename Column"
          />
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => onSetActiveModal("FindAndReplace", column)}
            title="Find and Replace in Column"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className={styles.button}
            onClick={() => onSetActiveModal("Filters", column)}
            title="Filter Column"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button
            className={styles.button}
            onClick={() => props.onSort(column)}
            title="Sort on Column"
          >
            <FontAwesomeIcon icon={getSortStateIcon()} />
          </button>
        </div>
      </div>
    </th>
  );
};

export default TableHeading;
