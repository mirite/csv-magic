import { OpenFilesContext } from "components/ViewContainer/ViewContainer";
import React, { useContext, useEffect, useState } from "react";
import KeyInFileSelector from "../KeyInFileSelector";

interface LookupOptionsProps {
  onChange: (e: number) => void;
}

const DuplicateOptions = (props: LookupOptionsProps) => {
  const [columnIDToDuplicate, setColumnIDToDuplicate] = useState<number>();

  const activeFile = useContext(OpenFilesContext);
  useEffect(() => {
    if (!columnIDToDuplicate) {
      return;
    }

    props.onChange(columnIDToDuplicate);
  }, [columnIDToDuplicate]);

  if (!activeFile.currentFile?.table) {
    return <p>No file active</p>;
  }

  return (
    <div>
      <KeyInFileSelector
        table={activeFile.currentFile.table}
        label="Key in this table to duplicate:"
        onChange={(key) => setColumnIDToDuplicate(key)}
      />
    </div>
  );
};

export default DuplicateOptions;
