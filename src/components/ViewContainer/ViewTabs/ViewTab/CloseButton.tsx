import styles from "./ViewTab.module.css";
import React from "react";

/**
 *
 * @param props
 * @param props.active
 * @param props.onClose
 */
function CloseButton(props: { active: boolean; onClose: () => void }) {
  const { active, onClose } = props;
  const closeClass = styles.closeButton + (active ? " " + styles.active : "");
  return (
    <button className={closeClass} onClick={() => onClose()}>
      X
    </button>
  );
}

export default CloseButton;
