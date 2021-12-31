/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, Fragment } from 'react';
import { OpenFilesContext } from 'components/ViewContainer';
import Chrome from './chrome/Chrome';
import Table from './table/Table';
import Sorting from 'modules/sorting';
import { IEditorState, IFile, ITable } from 'types';
import ModalActions from 'modules/ModalActions';

interface IProps {
	/**
	 * The data from the file that was opened.
	 */
	data: ITable;
}

/**
 * A file that has been opened and is being displayed as a table in the editor.
 */
class Editor extends Component<IProps, IEditorState> {
	modalActions: ModalActions;
	constructor(props: IProps) {
		super(props);
		const { data } = props;
		this.state = {
			activeSorts: [],
			activeData: data,
			activeModal: undefined,
			history: [],
		};

		this.modalActions = new ModalActions(
			(arg0, arg1) => this.setCoreState(arg0, arg1),
			this.state
		);
	}

	/**
	 * Handles the sorting on a key.
	 *
	 * @param  key The field to sort on.
	 */
	handleSort(key: string) {
		const { activeSorts, activeData } = this.state;

		/**
		 * Adds the new sort to the list of sorts if it isn't present or toggles direction/removes sort if it is already present.
		 */
		const newSorts = Sorting.setSort([...activeSorts], key);

		/**
		 * The updated data with sorting applied.
		 */
		const newData = Sorting.applySorting(activeData, newSorts);
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
		const { activeModal, activeData } = this.state;
		if (!activeModal) return;
		const { column, action } = activeModal;
		const { ComponentToUse, title, onApply } = action;

		return (
			<ComponentToUse
				title={title}
				column={column}
				table={activeData}
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
		const { history, activeData, activeSorts } = this.state;
		const newHistoryEntry = {
			activeData,
			activeSorts,
			timestamp: Date.now(),
		};
		const newHistory = [...history, newHistoryEntry];
		this.setState({
			activeData: newData,
			activeSorts: newSorts,
			history: newHistory,
		});
	}

	componentDidUpdate() {
		//This is necessary so that the modals always have the most recent data to work with after
		//a state change.
		this.modalActions.updateEditorState(this.state);
	}

	render() {
		const { activeData, activeSorts } = this.state;
		return (
			<Fragment>
				<Chrome
					editorState={this.state}
					onTableChange={(e: ITable) => this.handleTableChange(e)}
					onSetActiveModal={(modal) =>
						this.handleSetActiveModal(modal)
					}
				/>
				<Table
					data={activeData}
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
