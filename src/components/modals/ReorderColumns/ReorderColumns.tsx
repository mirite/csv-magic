import React, { Component, ComponentProps } from "react";
import { getColumns } from "modules/access-helpers";
import ColumnPosition from "./ColumnPosition/ColumnPosition";
import { Column } from "types";
import styles from "./ReorderColumnsModal.module.css";
import { reorderColumns } from "../../../modules/reordering";
import Modal, { BaseModalProps } from "../BaseModal/Modal";

interface IState {
  columns: Array<Column>;
}

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class ReorderColumnsModal extends Component<
  BaseModalProps,
  IState
> {
  constructor(props: BaseModalProps) {
    super(props);
    const { table } = props;
    const columns = getColumns(table);
    this.state = {
      columns,
    };
  }

  getContent() {
    const { columns } = this.state;
    return (
      <div className={styles.list}>
        {columns.map((column, index) => (
          <ColumnPosition
            key={column.id}
            value={column}
            onMove={(distance: number) => this.handleChange(index, distance)}
            toStart={-1 * index}
            toEnd={columns.length - 1 - index}
          />
        ))}
      </div>
    );
  }

  handleChange(initialIndex: number, distance: number) {
    const { columns } = this.state;
    const newIndex = initialIndex + distance;
    const newOrder = [...columns];
    const columnToMove = newOrder[initialIndex];
    newOrder.splice(initialIndex, 1);
    newOrder.splice(newIndex, 0, columnToMove);
    this.setState({ columns: newOrder });
  }

  handleApply(): void {
    const { columns } = this.state;
    const ids = columns.map((column: Column) => column.id);
    const table = reorderColumns(this.props.table, ids);
    this.props.onClose(table);
  }

  render() {
    const options: ComponentProps<typeof Modal> = {
      title: "Reorder Columns",
      applyText: "Reorder Columns",
      onApply: this.handleApply.bind(this),
      ...this.props,
    };
    return <Modal {...options}>{this.getContent()}</Modal>;
  }
}
