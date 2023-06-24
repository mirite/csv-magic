import React, { useState } from "react";
import Modal, { BaseModalProps } from "../BaseModal/Modal";
import { MappedColumn } from "types";
import styles from "./AddColumn.module.css";
import ColumnTypeRadio from "./AddColumnOptions/ColumnType";
import LookupOptions from "./AddColumnOptions/options/LookupOptions";
import PoolOptions from "./AddColumnOptions/options/PoolOptions";
import StaticOptions from "./AddColumnOptions/options/StaticOptions";
import DuplicateOptions from "./AddColumnOptions/options/DuplicateOptions";
import {
  addColumn,
  EGeneratorTypes,
} from "modules/column-generation/column-generator";

const AddColumnModal = (props: BaseModalProps) => {
  const { table, onClose } = props;
  const [newName, setNewName] = useState<string>("");
  const [newType, setNewType] = useState<EGeneratorTypes>(
    EGeneratorTypes.blank
  );
  const [params, setParams] = useState<
    undefined | string | string[] | MappedColumn
  >(undefined);

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewName(value);
  };

  const handleParamsChange = (value: string | string[] | MappedColumn) => {
    setParams(value);
  };

  const handleTypeChange = (e: EGeneratorTypes) => {
    setNewType(e);
    setParams(undefined);
  };

  const handleApply = () => {
    const newTable = addColumn(table, newName, newType, params);
    onClose(newTable);
  };

  const additionalOptions = () => {
    if (newType === EGeneratorTypes.blank) {
      return <span>There are no options for blank.</span>;
    }
    if (newType === EGeneratorTypes.statically) {
      return (
        <StaticOptions
          onChange={(value: string) => handleParamsChange(value)}
        />
      );
    }
    if (newType === EGeneratorTypes.lookup) {
      return (
        <LookupOptions
          onChange={(value: MappedColumn) => handleParamsChange(value)}
        />
      );
    }
    if (newType === EGeneratorTypes.pool) {
      return (
        <PoolOptions
          onChange={(values: string[]) => handleParamsChange(values)}
        />
      );
    }
    if (newType === EGeneratorTypes.duplicate) {
      return (
        <DuplicateOptions
          onChange={(value: string) => handleParamsChange(value)}
        />
      );
    }
    return null;
  };

  const options: React.ComponentProps<typeof Modal> = {
    title: "Add Column",
    applyText: "Add Column",
    onApply: handleApply,
    isValid: !!((params || newType === EGeneratorTypes.blank) && newName),
    ...props,
  };

  return (
    <Modal {...options}>
      <div>
        <div>
          <div className={styles.group}>
            <label htmlFor="name-input">
              <h3>Column Name:</h3>
            </label>
            <input
              id="name-input"
              className={styles.input}
              type="text"
              value={newName}
              onChange={handleNewNameChange}
            />
          </div>
          <div className={styles.group}>
            <h3>Column Type:</h3>
            <ColumnTypeRadio
              label="Blank"
              description="An empty column, nothing magical here."
              type={EGeneratorTypes.blank}
              onChange={handleTypeChange}
              default={true}
            />
            <ColumnTypeRadio
              label="Static"
              description="A column filled with a set value, It could be blank if you are really opposed to using the blank option."
              type={EGeneratorTypes.statically}
              onChange={handleTypeChange}
            />
            <ColumnTypeRadio
              label="Lookup"
              description="A column filled with data from matches in another open table. Basically a portal."
              type={EGeneratorTypes.lookup}
              onChange={handleTypeChange}
            />
            <ColumnTypeRadio
              label="Pool"
              description="A column with values randomly (but evenly) assigned from a pool of available values. (We can pretend it's a cauldron if you want)."
              type={EGeneratorTypes.pool}
              onChange={handleTypeChange}
            />
            <ColumnTypeRadio
              label="Duplicate"
              description="A column that is an exact clone of a column in this table."
              type={EGeneratorTypes.duplicate}
              onChange={handleTypeChange}
            />
          </div>
          <div className={styles.group}>
            <h3>Options:</h3>
            {additionalOptions()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddColumnModal;
