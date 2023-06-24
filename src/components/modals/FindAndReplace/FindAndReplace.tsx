import React, { Component, ComponentProps } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import { Column } from "types";
import styles from "./FindAndReplaceModal.module.css";
import { countOccurrences } from "modules/access-helpers";
import { findAndReplaceInColumn } from "../../../modules/editing";

interface IProps extends BaseModalProps {
  column: Column;
}

interface IState {
  findValue: string;
  replaceValue: string;
  testResult: string;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class FindAndReplaceModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      findValue: "",
      replaceValue: "",
      testResult: "Test to see how many rows this will impact.",
    };
  }
  getContent() {
    const { column } = this.props;
    return (
      <div>
        <p>Searching in &quot;{column.label}&quot;</p>
        <div className={styles.container}>
          <div className={styles.group}>
            <label htmlFor="find-input">Find:</label>
            <input
              id="find-input"
              className={styles.input}
              type="text"
              value={this.state.findValue}
              onChange={(e) => this.handleFindChange(e)}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="replace-input">Replace:</label>
            <input
              id="replace-input"
              className={styles.input}
              type="text"
              value={this.state.replaceValue}
              onChange={(e) => this.handleReplaceChange(e)}
            />
          </div>
        </div>
        <div className={styles.tester}>
          <button className={styles.button} onClick={() => this.testQuery()}>
            Test
          </button>
          <input
            type="text"
            readOnly
            className={styles.output}
            value={this.state.testResult}
          />
        </div>
      </div>
    );
  }
  testQuery(): number {
    const result = countOccurrences(
      this.props.table,
      this.props.column.id,
      this.state.findValue
    );
    let message: string;
    if (result === 0) {
      message = `This query will not affect any rows`;
    } else if (result === 1) {
      message = `${result} row affected`;
    } else {
      message = `${result} rows affected`;
    }
    this.setState({ testResult: message });
    return result;
  }
  handleReplaceChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    this.setState({ replaceValue: value });
  }
  handleFindChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    this.setState({ findValue: value });
  }

  handleApply(): void {
    const { findValue, replaceValue } = this.state;
    const { column } = this.props;
    const table = findAndReplaceInColumn(
      this.props.table,
      column,
      findValue,
      replaceValue
    );
    this.props.onClose(table);
  }

  isApplyEnabled(): boolean {
    const { findValue } = this.state;
    return findValue !== "";
  }

  render() {
    const options: ComponentProps<typeof Modal> = {
      title: "Find and Replace In Column",
      applyText: "Replace",
      onApply: this.handleApply.bind(this),
      ...this.props,
    };
    return <Modal {...options}>{this.getContent()}</Modal>;
  }
}
