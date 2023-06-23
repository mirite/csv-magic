import React, { Component, ComponentProps } from 'react';
import Modal, { BaseModalProps } from '../BaseModal/Modal';
import { IColumn } from "types";
import styles from "./RemoveColumnsModal.module.css";
import { getColumns } from "modules/access-helpers";
import ColumnValue from "./ColumnValue/ColumnValue";
import { removeColumns } from "../../../modules/editing";

interface IState {
  columns: Array<[IColumn, boolean]>;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class RemoveColumnsModal extends Component<
  BaseModalProps,
  IState
> {


  constructor(props: BaseModalProps) {
    super(props);
    const { table } = props;
    const columns = getColumns(table);
    this.state = {
      columns: columns.map((label) => [label, false]),
    };
  }

  getContent() {
    const { columns } = this.state;
    return (
      <ul className={styles.list}>
        {columns.map((pair) => (
          <ColumnValue
            key={pair[0].id}
            value={pair[0]}
            onChange={(value: IColumn, status: boolean) =>
              this.handleChange(value, status)
            }
          />
        ))}
      </ul>
    );
  }

  handleChange(column: IColumn, status: boolean): void {
    const newColumns = [...this.state.columns];
    const oldRecord = newColumns.find((pair) => pair[0].id === column.id);
    if (oldRecord) {
      oldRecord[1] = status;
      this.setState({ columns: newColumns });
    }
  }

  getColumnsToDelete() {
    const { columns } = this.state;
    return columns.filter((pair) => pair[1]).map((pair) => pair[0]);
  }

  handleApply(): void {
    const columnsToDelete = this.getColumnsToDelete();
    const table = removeColumns(this.props.table, columnsToDelete);
    this.props.onClose(table);
  }

  isApplyEnabled() {
    return this.getColumnsToDelete().length > 0;
  }

  render() {
    const options: ComponentProps<typeof Modal> = {
      title: "Remove Columns",
      applyText: "Remove Selected Columns",
      onApply: this.handleApply.bind(this),
      ...this.props
    };
    return <Modal {...options} >{this.getContent()}</Modal>;
  }
}
