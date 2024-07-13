import type { ReactNode } from "react";
import React from "react";
import styles from "./ViewTab.module.css";
import CloseButton from "./CloseButton";

interface IProps {
  /**
   * The label or name to display on the tab.
   */
  label: string | ReactNode;

  /**
   * true represents that the current tab is active.
   */
  active: boolean;

  /**
   * The event to call when the tab is clicked on.
   */
  onClick: () => void;

  /**
   * The event to call when the tabs close button is clicked.
   */
  onClose: () => void;

  /**
   * Whether this tab is the home tab.
   */
  home: boolean;
}

/**
 * A tab in the app representing an open file.
 * @param props
 */
function ViewTab(props: IProps) {
  const { active, onClick, onClose, home, label } = props;

  const titleClass =
    (home ? styles.homeButton : styles.titleButton) +
    (active ? " " + styles.active : "");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <li className={styles.navItem}>
      <button
        className={titleClass}
        aria-current="page"
        onClick={(e) => handleClick(e)}
      >
        {label}
      </button>
      {home ? "" : <CloseButton active={active} onClose={onClose} />}
    </li>
  );
}

export default ViewTab;
