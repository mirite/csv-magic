import React, { FunctionComponent } from "react";
import { File } from "types";
import { useFileStore } from "modules/useFileStore";

interface OpenFileSelectorProps {
  onChange: (file: File) => void;
  currentFile?: File;
}

const OpenFileSelector: FunctionComponent<OpenFileSelectorProps> = (props) => {
  const fileContext = useFileStore();
  const { files } = fileContext;

  const cleanedFiles = files.filter((file) => file.fileName?.trim() && file.id !== props.currentFile?.id);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fileID = Number.parseInt(e.currentTarget.value);
    const file = cleanedFiles.find((currentFileInLoop) => currentFileInLoop.id === fileID);
    if (!file) return;
    props.onChange(file);
  };

  return (
    <div>
      <label htmlFor="select-file">Select File:</label>
      <select id="select-file" onChange={(e) => handleChange(e)}>
        <option value="">Please select a file</option>
        {cleanedFiles.map((file) => (
          <option key={file.fileName} value={file.id}>
            {file.prettyName} - ({file.prettyID})
          </option>
        ))}
      </select>
    </div>
  );
};

export default OpenFileSelector;
