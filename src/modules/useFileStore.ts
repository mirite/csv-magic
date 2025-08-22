import { deleteRow, duplicateRow } from "modules/row-actions";
import Sorting from "modules/sorting";
import { create } from "zustand";

import type { File, FileHistory, Row, Sorts, Table } from "../types";

export interface FileStoreState {
	currentIndex: number;
	files: File[];
	currentFile: () => File | null;
}

interface FileStoreActions {
	addFile: (file: File) => void;
	removeFile: (index: number) => void;
	clearFiles: () => void;
	setCurrentIndex: (index: number) => void;
	updateCurrentFile: (table: Table, sorts: Sorts, history: FileHistory) => void;
	setCoreState: (table: Table, sorts?: Sorts) => void;
}
const rowActions = {
	delete: deleteRow,
	duplicate: duplicateRow,
} as const;

export type RowAction = keyof typeof rowActions;

export const useFileStore = create<FileStoreState & FileStoreActions>(
	(set, get) => ({
		files: [],
		currentIndex: -1,
		addFile: (file) => set((state) => ({ files: [...state.files, file] })),
		removeFile: (index) =>
			set((state) => ({
				files: state.files.filter((_, i) => i !== index),
				currentIndex: state.currentIndex === index ? -1 : state.currentIndex,
			})),
		clearFiles: () => set({ files: [], currentIndex: -1 }),
		setCurrentIndex: (index) => set({ currentIndex: index }),
		updateCurrentFile: (table: Table, sorts: Sorts, history: FileHistory) => {
			set((state) => {
				const newFiles = [...state.files];
				const file = newFiles[state.currentIndex];
				newFiles[state.currentIndex] = {
					...file,
					table,
					activeSorts: sorts,
					history,
				};

				return { files: newFiles };
			});
		},
		currentFile: () => {
			const currentIndex = get().currentIndex;
			const files = get().files;
			return currentIndex >= 0 && currentIndex < files.length
				? files[currentIndex]
				: null;
		},
		handleSort: (columnID: number) => {
			const current = get().currentFile();
			if (!current) return;
			const newSorts = Sorting.setSort(current.activeSorts, columnID);

			const newData = Sorting.applySorting(current.table, newSorts);
			get().setCoreState(newData, newSorts);
		},

		handleRowAction: (action: RowAction, row: Row) => {
			const current = get().currentFile();
			if (!current) return;
			const newTable = rowActions[action](current.table, row);
			get().setCoreState(newTable);
		},
		setCoreState: (newTable: Table, newSorts?: Sorts) => {
			const current = get().currentFile();
			if (!current) return;
			const newHistory = [...current.history, current.table];
			get().updateCurrentFile(
				newTable,
				newSorts || current.activeSorts,
				newHistory,
			);
		},
	}),
);
