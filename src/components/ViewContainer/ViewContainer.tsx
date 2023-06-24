import React, { useState } from "react";
import MainView from "../MainView/MainView";
import { File, FileHistory, Sorts, Table } from "types";
import ViewTabs from "./ViewTabs/ViewTabs";
import { cloneDeep } from "modules/tools";

interface IFilesContext {
  files: Array<File>;
  currentFile: File | undefined;
}
export const OpenFilesContext = React.createContext<IFilesContext>({
  files: [],
  currentFile: undefined,
});

function ViewContainer() {
  const [files, setFiles] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleLoad = (file?: File) => {
    if (!file) {
      return;
    }

    const filesClone = [...files];
    filesClone.push(file);

    const newIndex = filesClone.length - 1;
    setFiles(filesClone);
    setCurrentIndex(newIndex);
  };

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTabClose = (index: number) => {
    let newIndex = currentIndex;
    if (currentIndex === index) {
      newIndex -= 1;
    }

    const remainingFiles = files.filter((file, i) => i !== index);
    setCurrentIndex(newIndex);
    setFiles(remainingFiles);
  };

  const handleTableChange = (
    table: Table,
    sorts: Sorts,
    history: FileHistory
  ) => {
    const newFiles = cloneDeep(files) as File[];
    const file = newFiles[currentIndex];
    file.table = table;
    file.activeSorts = sorts;
    file.history = history;
    setFiles(newFiles);
  };

  const currentFile = files[currentIndex];

  return (
    <OpenFilesContext.Provider value={{ files, currentFile }}>
      <div>
        <ViewTabs
          files={files}
          currentIndex={currentIndex}
          onTabClick={(e) => handleTabClick(e)}
          onTabClose={(e) => handleTabClose(e)}
        />
        <MainView
          file={currentFile}
          onLoad={(file) => handleLoad(file)}
          onTableChange={(table: Table, sorts: Sorts, history: FileHistory) =>
            handleTableChange(table, sorts, history)
          }
        />
      </div>
    </OpenFilesContext.Provider>
  );
}

export default ViewContainer;
