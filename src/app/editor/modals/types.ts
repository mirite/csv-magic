import type { Column, Table } from "@/types.js";
import type { PropsWithChildren } from "react";

export type BaseModalProps = PropsWithChildren<{
	applyText?: string;
	isValid?: boolean;
	onApply: () => unknown;
	onClose: (changedTable?: Table) => unknown;
	table: Table;
	title?: string;
}>;

export type ChildModalProps = Omit<
	BaseModalProps,
	"applyText" | "isValid" | "onApply" | "title"
>;

export type ChildModalPropsWithColumn = ChildModalProps & { column: Column };
