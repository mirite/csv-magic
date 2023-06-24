import { OpenFilesContext } from "components/ViewContainer/ViewContainer";
import React, { useContext, useEffect, useState } from "react";
import { File, MappedColumn } from "types";
import KeyInFileSelector from "../KeyInFileSelector";
import OpenFileSelector from "../OpenFileSelector";

interface LookupOptionsProps {
  onChange: (e: MappedColumn) => void;
}

const LookupOptions = (props: LookupOptionsProps) => {
  const [otherFile, setOtherFile] = useState<File>();
  const [sourceMatchKey, setSourceMatchKey] = useState<number>();
  const [foreignMatchKey, setForeignMatchKey] = useState<number>();
  const [foreignImportKey, setForeignImportKey] = useState<number>();

  const activeFile = useContext(OpenFilesContext);
  useEffect(() => {
    const foreignTable = otherFile?.table;
    if (
      !foreignTable ||
      !sourceMatchKey ||
      !foreignMatchKey ||
      !foreignImportKey
    ) {
      return;
    }
    const mappedColumn: MappedColumn = {
      foreignTable,
      sourceMatchID: sourceMatchKey,
      foreignMatchID: foreignMatchKey,
      foreignImportID: foreignImportKey,
    };
    props.onChange(mappedColumn);
  }, [foreignMatchKey, sourceMatchKey, otherFile, foreignImportKey]);

  if (!activeFile.currentFile?.table) {
    return <p>No file active</p>;
  }

  const otherFileKeySelector = () => {
    if (!otherFile?.table) {
      return <p>Please select a file.</p>;
    }
    return (
      <div>
        <KeyInFileSelector
          table={otherFile?.table}
          label="Key in the other table to match on:"
          onChange={(key) => setForeignMatchKey(key)}
        />
        <KeyInFileSelector
          table={otherFile?.table}
          label="Key in the other table to import:"
          onChange={(key) => setForeignImportKey(key)}
        />
      </div>
    );
  };
  return (
    <div>
      <OpenFileSelector
        onChange={(e: File) => setOtherFile(e)}
        currentFile={activeFile.currentFile}
      />
      <KeyInFileSelector
        table={activeFile.currentFile.table}
        label="Key in this table to match on:"
        onChange={(key) => setSourceMatchKey(key)}
      />
      {otherFileKeySelector()}
    </div>
  );
};

export default LookupOptions;
