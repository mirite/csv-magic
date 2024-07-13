import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import KeyInFileSelector from "../KeyInFileSelector";
import { useFileStore } from "modules/useFileStore";

interface LookupOptionsProps {
  onChange: (e: number) => void;
}

const DuplicateOptions = (props: LookupOptionsProps): ReactElement => {
  const { onChange } = props;
  const [columnIDToDuplicate, setColumnIDToDuplicate] = useState<number>();

  const activeFile = useFileStore();
  const currentFile = activeFile.currentFile();
  useEffect(() => {
    if (!columnIDToDuplicate) {
      return;
    }

    onChange(columnIDToDuplicate);
  }, [columnIDToDuplicate, onChange]);

  if (!currentFile?.table) {
    return <p>No file active</p>;
  }

  return (
    <div>
      <KeyInFileSelector
        table={currentFile.table}
        label="Key in this table to duplicate:"
        onChange={(key) => setColumnIDToDuplicate(key)}
      />
    </div>
  );
};

export default DuplicateOptions;
