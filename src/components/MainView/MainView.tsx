import React from "react";
import FileSelector from "../FileSelector/FileSelector";
import Editor from "../Editor/Editor";
import { Table, File, FileHistory, Sorts } from "types";

interface IProps {
  /**
   * The current open file (if any).
   */
  file?: File;

  /**
   * The event handler to call when a new file is loaded.
   */
  onLoad: (file?: File) => void;
  onTableChange: (table: Table, sorts: Sorts, history: FileHistory) => void;
}

/**
 * A pane for a file. Shows the open file dialog if there isn't a file yet, or the file if there is.
 */
function MainView(props: IProps) {
  const { file, onLoad, onTableChange } = props;

  return (
    <div>
      {file ? (
        <Editor file={file} onChange={onTableChange} />
      ) : (
        <FileSelector onChange={(data) => onLoad(data)} />
      )}
    </div>
  );
}

export default MainView;
