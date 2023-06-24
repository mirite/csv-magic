import React, { useState } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import { Column } from "types";
import styles from "./FindAndReplaceModal.module.css";
import { countOccurrences } from "modules/access-helpers";
import { findAndReplaceInColumn } from "../../../modules/editing";

interface IProps extends BaseModalProps {
  column: Column;
}

const FindAndReplaceModal = (props: IProps) => {
  const { column, table, onClose } = props;
  const [findValue, setFindValue] = useState("");
  const [replaceValue, setReplaceValue] = useState("");
  const [testResult, setTestResult] = useState(
    "Test to see how many rows this will impact."
  );

  const handleFindChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFindValue(value);
  };

  const handleReplaceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setReplaceValue(value);
  };

  const handleApply = (): void => {
    const newTable = findAndReplaceInColumn(
      table,
      column,
      findValue,
      replaceValue
    );
    onClose(newTable);
  };

  const testQuery = (): number => {
    const result = countOccurrences(table, column.id, findValue);
    let message: string;
    if (result === 0) {
      message = "This query will not affect any rows";
    } else if (result === 1) {
      message = `${result} row affected`;
    } else {
      message = `${result} rows affected`;
    }
    setTestResult(message);
    return result;
  };

  const options: React.ComponentProps<typeof Modal> = {
    title: "Find and Replace In Column",
    applyText: "Replace",
    onApply: handleApply,
    isValid: findValue !== "",
    ...props,
  };

  return (
    <Modal {...options}>
      <div>
        <p>Searching in &quot;{column.label}&quot;</p>
        <div className={styles.container}>
          <div className={styles.group}>
            <label htmlFor="find-input">Find:</label>
            <input
              id="find-input"
              className={styles.input}
              type="text"
              value={findValue}
              onChange={handleFindChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="replace-input">Replace:</label>
            <input
              id="replace-input"
              className={styles.input}
              type="text"
              value={replaceValue}
              onChange={handleReplaceChange}
            />
          </div>
        </div>
        <div className={styles.tester}>
          <button className={styles.button} onClick={testQuery}>
            Test
          </button>
          <input
            type="text"
            readOnly
            className={styles.output}
            value={testResult}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FindAndReplaceModal;
