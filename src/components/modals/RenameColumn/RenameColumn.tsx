import React, { Component, ComponentProps } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import { Column } from "types";
import styles from "./RenameColumn.module.css";
import { renameColumn } from "../../../modules/editing";

interface IProps extends BaseModalProps {
  column: Column;
}

interface IState {
  newName: string;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class RenameColumnModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      newName: "",
    };
  }

  getContent() {
    const { column } = this.props;
    return (
      <div>
        <p>Renaming &quot;{column.label}&quot;</p>
        <div className={styles.container}>
          <div className={styles.group}>
            <label htmlFor="find-input">New Name:</label>
            <input
              id="find-input"
              className={styles.input}
              type="text"
              value={this.state.newName}
              onChange={(e) => this.handleNewNameChange(e)}
            />
          </div>
        </div>
      </div>
    );
  }

  handleNewNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    this.setState({ newName: value });
  }

  handleApply(): void {
    const { newName } = this.state;
    const { column } = this.props;
    const table = renameColumn(this.props.table, column.id, newName.trim());
    this.props.onClose(table);
  }

  isApplyEnabled() {
    const { newName } = this.state;
    return newName.trim() !== "";
  }

  render() {
    const options: ComponentProps<typeof Modal> = {
      title: "Rename Column",
      applyText: "Rename",
      onApply: this.handleApply.bind(this),
      ...this.props,
    };
    return <Modal {...options}>{this.getContent()}</Modal>;
  }
}
