import React, { useState } from "react";
import CSVLoader from "modules/csv/csv-loader";
import FileInput from "./FileInput/FileInput";
import SubmitButton from "./SubmitButton/SubmitButton";
import styles from "./FileSelector.module.css";
import { useFileStore } from "modules/useFileStore";

const FileSelector = () => {
  const { addFile, setCurrentIndex, files } = useFileStore();
  const [processing, setProcessing] = useState<boolean>(false);
  const [fileTextContent, setFileTextContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileAttached, setFileAttached] = useState<boolean>(false);

  const handleAttachFile = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const file = files?.item(0);
    if (file) {
      const fileText = await file.text();
      const fileName = file.name;
      setFileTextContent(fileText);
      setFileName(fileName);
      setFileAttached(true);
    }
  };

  const process = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setProcessing(true);
    const file = await CSVLoader(fileName, fileTextContent);

    if (!file) {
      return;
    }

    addFile(file);
    setCurrentIndex(files.length);
  };

  return (
    <div>
      <form onSubmit={process}>
        <FileInput onAttachFile={handleAttachFile} />
        <div className={styles.submitButtonContainer}>
          <SubmitButton processing={processing} fileAttached={fileAttached} />
        </div>
      </form>
    </div>
  );
};

export default FileSelector;
