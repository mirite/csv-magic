import React from "react";
import SaveAsField from "./SaveAsField/SaveAsField";
import UndoRedo from "./UndoRedo/UndoRedo";
import styles from "./Chrome.module.css";
import SuperTools from "./SuperTools/SuperTools";
import type { Table } from "types";
import { useFileStore } from "modules/useFileStore";

interface ChromeProps {
  onTableChange: (table: Table) => void;
}

const Chrome = (props: ChromeProps) => {
  const file = useFileStore().currentFile();
  if (!file) {
    return <p>No file active</p>;
  }
  return (
    <div className={styles.container}>
      <UndoRedo history={file.history} onTableChange={props.onTableChange} />
      <SuperTools />
      <SaveAsField table={file.table} />
    </div>
  );
};

export default Chrome;
