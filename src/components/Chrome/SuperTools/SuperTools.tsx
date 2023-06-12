import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SuperTools.module.css";
import { availableModal } from "types";

interface SuperToolsProps {
  onSetActiveModal: (modalToDisplay: availableModal) => void;
}

const SuperTools: FunctionComponent<SuperToolsProps> = (props) => {
  const { onSetActiveModal } = props;
  return (
    <div>
      <button
        className={styles.remove}
        onClick={() => onSetActiveModal("RemoveColumns")}
        title="Remove Columns"
      >
        <FontAwesomeIcon icon={faMinusSquare} />
        &nbsp;Remove Columns
      </button>
      <button
        className={styles.add}
        onClick={() => onSetActiveModal("AddColumn")}
        title="Add Column"
      >
        <FontAwesomeIcon icon={faPlusSquare} />
        &nbsp;Generate Column
      </button>
      <button
        className={styles.add}
        onClick={() => onSetActiveModal("ReorderColumns")}
        title="Reorder Columns"
      >
        <FontAwesomeIcon icon={faRandom} />
        &nbsp;Reorder Columns
      </button>
    </div>
  );
};

export default SuperTools;
