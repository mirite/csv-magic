/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import { OpenFilesContext } from 'components/ViewContainer';
import Chrome from './chrome/Chrome';
import Table from './table/Table';
import Sorting from 'modules/sorting';
import { IEditorState, IEditorStateAndTable, IFile, ITable } from 'types';
import ModalActions from 'modules/ModalActions';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	table: ITable;
	onChange: (table: ITable) => any;
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
 */
class Editor extends Component<IProps, IEditorState> {
	modalActions: ModalActions;
	constructor(props: IProps) {
		super(props);
		this.state = {
			activeSorts: [],
			activeModal: undefined,
			history: [],
		};

		this.modalActions = new ModalActions(
			(arg0, arg1) => this.setCoreState(arg0, arg1),
			this.createEditorStateAndTable()
		);
	}

	/**
	 * Handles the sorting on a key.
	 *
	 * @param  key The field to sort on.
	 */
	handleSort(key: string) {
		const { table } = this.props;
		const { activeSorts } = this.state;

		/**
		 * Adds the new sort to the list of sorts if it isn't present or toggles direction/removes sort if it is already present.
		 */
		const newSorts = Sorting.setSort([...activeSorts], key);

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
		const { table } = this.props;
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
	handleSetActiveModal(modalName: string, column?: string) {
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
		const { activeSorts } = this.state;
		this.setCoreState(changedTable, activeSorts);
	}

	setCoreState(newData: ITable, newSorts: Array<[string, boolean]>) {
		const { table, onChange } = this.props;
		const { history, activeSorts } = this.state;
		const newHistoryEntry = {
			table,
			activeSorts,
			timestamp: Date.now(),
		};
		const newHistory = [...history, newHistoryEntry];
		onChange(newData);
		this.setState({
			activeSorts: newSorts,
			history: newHistory,
		});
	}

	createEditorStateAndTable(): IEditorStateAndTable {
		return { ...this.state, activeData: this.props.table };
	}

	componentDidUpdate() {
		//This is necessary so that the modals always have the most recent data to work with after
		//a state change.
		this.modalActions.updateEditorState(this.createEditorStateAndTable());
	}

	render() {
		const { table } = this.props;
		const { activeSorts } = this.state;
		return (
			<Fragment>
				<Chrome
					editorState={this.createEditorStateAndTable()}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					onSetActiveModal={(modal) =>
						this.handleSetActiveModal(modal)
					}
				/>
				<Table
					data={table}
					onSort={(e: string) => this.handleSort(e)}
					oneSetActiveModal={(modal, column) =>
						this.handleSetActiveModal(modal, column)
					}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					activeSorts={activeSorts}
				/>
				{this.getModals()}
			</Fragment>
		);
	}
}

export default Editor;
