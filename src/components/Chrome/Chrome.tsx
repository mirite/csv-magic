import React from "react";
import SaveAsField from "./SaveAsField/SaveAsField";
import UndoRedo from "./UndoRedo/UndoRedo";
import styles from "./Chrome.module.css";
import SuperTools from "./SuperTools/SuperTools";
import { File, Table } from "types";

interface ChromeProps {
  editorState: File;
  onTableChange: (table: Table) => void;
}

const Chrome = (props: ChromeProps) => {
  return (
    <div className={styles.container}>
      <UndoRedo
        history={props.editorState.history}
        onTableChange={props.onTableChange}
      />
      <SuperTools />
      <SaveAsField table={props.editorState.table} />
    </div>
  );
};

export default Chrome;
