import { create } from "zustand";

import type { File, FileHistory, Sorts, Table } from "@/types.js";

export interface FileStoreState {
	currentFile: () => File | null;
	currentIndex: number;
	files: File[];
}

interface FileStoreActions {
	addFile: (file: File) => void;
	clearFiles: () => void;
	removeFile: (index: number) => void;
	setCurrentIndex: (index: number) => void;
	updateCurrentFile: (table: Table, sorts: Sorts, history: FileHistory) => void;
}

export const useFileStore = create<FileStoreActions & FileStoreState>(
	(set, get) => ({
		addFile: (file) => set((state) => ({ files: [...state.files, file] })),
		clearFiles: () => set({ currentIndex: -1, files: [] }),
		currentFile: () => {
			const currentIndex = get().currentIndex;
			const files = get().files;
			return currentIndex >= 0 && currentIndex < files.length
				? files[currentIndex]
				: null;
		},
		currentIndex: -1,
		files: [],
		removeFile: (index) =>
			set((state) => ({
				currentIndex: state.currentIndex === index ? -1 : state.currentIndex,
				files: state.files.filter((_, i) => i !== index),
			})),
		setCurrentIndex: (index) => set({ currentIndex: index }),
		updateCurrentFile: (table: Table, sorts: Sorts, history: FileHistory) => {
			set((state) => {
				const newFiles = [...state.files];
				const file = newFiles[state.currentIndex];
				newFiles[state.currentIndex] = {
					...file,
					activeSorts: sorts,
					history,
					table,
				};

				return { files: newFiles };
			});
		},
	}),
);
