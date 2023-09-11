import { create } from "zustand";
import { File, FileHistory, Sorts, Table } from "../types";

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
}

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
  }),
);
