/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import Chrome from './chrome/Chrome';
import Table from './table/Table';
import Sorting from 'modules/sorting';
import {
	IActiveModal,
	IColumn,
	IFile,
	IFileHistory,
	IRow,
	ISorts,
	ITable,
} from 'types';
import ModalActions from 'modules/ModalActions';
import { deleteRow, duplicateRow } from 'modules/row-actions';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	file: IFile;
	onChange: (table: ITable, sorts: ISorts, history: IFileHistory) => any;
}

interface IState {
	activeModal: undefined | IActiveModal;
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
 */
class Editor extends Component<IProps, IState> {
	modalActions: ModalActions;
	constructor(props: IProps) {
		super(props);
		this.state = {
			activeModal: undefined,
		};

		this.modalActions = new ModalActions(
			(arg0, arg1) => this.setCoreState(arg0, arg1),
			this.props.file
		);
	}

	/**
	 * Handles the sorting on a key.
	 *
	 * @param  columnID The field to sort on.
	 */
	handleSort(columnID: string) {
		const { table, activeSorts } = this.props.file;

		/**
		 * Adds the new sort to the list of sorts if it isn't present or toggles direction/removes sort if it is already present.
		 */
		const newSorts = Sorting.setSort(activeSorts, columnID);

		/**
		 * The updated data with sorting applied.
		 */
		const newData = Sorting.applySorting(table, newSorts);
		this.setCoreState(newData, newSorts);
	}

	/**
	 * Handles the closing of the filter window.
	 */
	handleModalClose(): void {
		this.setState({ activeModal: undefined });
	}

	/**
	 * Displays the filter modal if it is active.
	 */
	getModals() {
		const { table } = this.props.file;
		const { activeModal } = this.state;
		if (!activeModal) return;
		const { column, action } = activeModal;
		const { ComponentToUse, title, onApply } = action;

		return (
			<ComponentToUse
				title={title}
				column={column}
				table={table}
				onClose={() => this.handleModalClose()}
				onApply={(...args: any) => onApply(...args)}
			/>
		);
	}

	/**
	 * Handles showing the filter window for the specified key.
	 *
	 * @param  modalName The modal to display.
	 * @param  column    The key to run the modal on.
	 */
	handleSetActiveModal(modalName: string, column?: IColumn) {
		const action = this.modalActions.modals[modalName];
		if (!action) throw new Error(`Invalid modal requested "${modalName}"`);
		this.setState({ activeModal: { column, action } });
	}

	/**
	 * Handles the change of a value within a table.
	 *
	 * @param  changedTable The new table data.
	 */
	handleTableChange(changedTable: ITable) {
		const { activeSorts } = this.props.file;
		this.setCoreState(changedTable, activeSorts);
	}

	handleRowAction(action: string, row: IRow): void {
		const { table, activeSorts } = this.props.file;
		if (action === 'delete') {
			const newTable = deleteRow(table, row);
			this.setCoreState(newTable, activeSorts);
		} else if (action === 'duplicate') {
			const newTable = duplicateRow(table, row);
			this.setCoreState(newTable, activeSorts);
		}
	}
	setCoreState(newTable: ITable, newSorts: ISorts) {
		const { onChange } = this.props;
		const { table, history } = this.props.file;
		const newHistory = [...history, table];
		onChange(newTable, newSorts, newHistory);
	}

	componentDidUpdate() {
		//This is necessary so that the modals always have the most recent data to work with after
		//a state change.
		this.modalActions.updateEditorState(this.props.file);
	}

	render() {
		const { table, activeSorts } = this.props.file;
		return (
			<Fragment>
				<Chrome
					editorState={this.props.file}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					onSetActiveModal={(modal) =>
						this.handleSetActiveModal(modal)
					}
				/>
				<Table
					data={table}
					onSort={(e: string) => this.handleSort(e)}
					onSetActiveModal={(modal, column) =>
						this.handleSetActiveModal(modal, column)
					}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					onRowAction={(action, row) =>
						this.handleRowAction(action, row)
					}
					activeSorts={activeSorts}
				/>
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Editor;
