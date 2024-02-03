import React from "react";
import styles from "../AddColumnOptions.module.css";

interface StaticOptionsProps {
  onChange: (e: string) => void;
}

const StaticOptions = (props: StaticOptionsProps) => {
  return (
    <div>
      <label htmlFor="static-option" className={styles.label}>
        Static Value:
      </label>
      <input type="text" className={styles.input} id="static-option" onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
};

export default StaticOptions;
