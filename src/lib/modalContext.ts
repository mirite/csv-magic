import type { Modal, Table } from "@/types.js";
import { createContext } from "react";

export type ModalContextType = {
	onClose: (changedTable?: Table) => void;
	setActiveModal: (modal: Modal) => void;
	table: Table;
};

export const ModalContext = createContext<ModalContextType>({
	onClose: () => {},
	setActiveModal: () => {},
	table: { columns: [], contents: [], firstCellId: "" },
});
