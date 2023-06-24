import React, { Component, ComponentProps } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import FilterValue from "./FilterValue/FilterValue";
import { getUniqueValuesInColumn } from "modules/access-helpers";
import { IColumn, IFilter } from "types";
import styles from "./Filters.module.css";
import Filtering from "../../../modules/filtering";

interface IProps extends BaseModalProps {
  column: IColumn;
}

interface IState {
  filterList: IFilter;
}
/**
 * A popover for filtering the showing rows based on their values.
 */
export default class FiltersModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { column } = props;
    this.state = { filterList: { column, values: [] } };
  }
  getContent() {
    const { table, column } = this.props;
    return (
      <>
        <ul className={styles.list}>
          {getUniqueValuesInColumn(table, column.id).map((pair) => (
            <FilterValue
              key={pair[0]}
              value={pair[0]}
              count={pair[1]}
              checked={this.state.filterList.values.includes(pair[0])}
              onChange={(value: string, status: boolean) =>
                this.handleChange(value, status)
              }
            />
          ))}
        </ul>
        <button
          onClick={() => this.invertSelection()}
          className={styles.button}
        >
          Invert Selection
        </button>
      </>
    );
  }

  handleChange(valueToToggle: string, newStatus: boolean) {
    /**
     * The filter list previously existing in the state.
     */
    const oldFilterList = this.state.filterList.values;
    const { column } = this.props;

    /**
     * The new filter list once our change is applied.
     */
    const newFilterList: IFilter = { column, values: [] };

    //If the filter status was switched to off, we just need the filter list with that filter removed
    //(Even if it was never there to begin with)
    if (!newStatus) {
      newFilterList.values = oldFilterList.filter(
        (existingValue) => existingValue !== valueToToggle
      );
    } else {
      /**
       * Any existing filters on value.
       */
      const existingFilter = oldFilterList.find(
        (existingValue) => existingValue === valueToToggle
      );

      //If we are already filtering on this value no need to update the state.
      if (existingFilter) {
        return;
      }

      newFilterList.values = [...oldFilterList, valueToToggle];
    }

    this.setState({ filterList: newFilterList });
  }

  handleApply(): void {
    const { filterList } = this.state;
    const newTable = Filtering.applyFilters(this.props.table, filterList);
    this.props.onClose(newTable);
  }

  isApplyEnabled() {
    return this.state.filterList.values.length > 0;
  }

  private invertSelection() {
    const { table, column } = this.props;
    const allValues = getUniqueValuesInColumn(table, column.id);
    const { values: oldActiveValues } = this.state.filterList;
    const values = allValues
      .map((item) => item[0])
      .filter((item) => !oldActiveValues.includes(item));
    const filterList: IFilter = { column, values };
    this.setState({ filterList });
  }

  render() {
    const options: ComponentProps<typeof Modal> = {
      title: "Filter",
      applyText: "Filter",
      onApply: this.handleApply.bind(this),
      ...this.props,
    };
    return <Modal {...options}>{this.getContent()}</Modal>;
  }
}
