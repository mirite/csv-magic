import React from "react";
import FileSelector from "../FileSelector/FileSelector";
import Editor from "../Editor/Editor";
import { ITable, IFile, IFileHistory, ISorts } from "types";

interface IProps {
  /**
   * The current open file (if any).
   */
  file?: IFile;

  /**
   * The event handler to call when a new file is loaded.
   */
  onLoad: (file?: IFile) => void;
  onTableChange: (table: ITable, sorts: ISorts, history: IFileHistory) => void;
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
