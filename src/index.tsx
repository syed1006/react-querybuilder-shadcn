import type {
	ControlElementsProp,
	FullField,
	QueryBuilderContextProvider,
	Translations,
} from "react-querybuilder";
import { getCompatContextProvider } from "react-querybuilder";
import { ShadcnValueSelector } from "./components/ShadcnValueSelector";
import { ShadcnValueEditor } from "./components/ShadcnValueEditor";
import "react-querybuilder/dist/query-builder-layout.css";
import "./index.min.css";
import { ShadcnShiftActions } from "./components/ShadcnShiftActions";
import { ShadcnNotToggle } from "./components/ShadcnNotToggle";
import { ShadcnDragHandle } from "./components/ShadcnDragHandle";
import { ShadcnActionElement } from "./components/ShadcnActionElements";
import {
	Copy,
	CopyPlus,
	LockKeyhole,
	LockKeyholeOpen,
	LockOpen,
	Trash2,
	Lock,
	FolderPlus,
	FilePlus2,
} from "lucide-react";

export * from "./types";
export * from "./constants";
export * from "./components/ShadcnValueSelector";
export * from "./components/ShadcnValueEditor";
export * from "./components/ShadcnShiftActions";
export * from "./components/ShadcnNotToggle";
export * from "./components/ShadcnDragHandle";
export * from "./components/ShadcnActionElements";

export const shadcnControlElements: ControlElementsProp<FullField, string> = {
	valueSelector: ShadcnValueSelector,
	valueEditor: ShadcnValueEditor,
	shiftActions: ShadcnShiftActions,
	notToggle: ShadcnNotToggle,
	dragHandle: ShadcnDragHandle,
	actionElement: ShadcnActionElement,
};

export const shadcnTranslations: Partial<Translations> = {
	addGroup: {
		label: (
			<>
				<FolderPlus /> Group
			</>
		),
	},
	addRule: {
		label: (
			<>
				<FilePlus2 /> Rule
			</>
		),
	},
	removeGroup: { label: <Trash2 stroke="#F95454" /> },
	removeRule: { label: <Trash2 stroke="#F95454" /> },
	cloneRule: { label: <Copy /> },
	cloneRuleGroup: { label: <CopyPlus /> },
	lockGroup: { label: <LockKeyholeOpen /> },
	lockRule: { label: <LockOpen /> },
	lockGroupDisabled: { label: <LockKeyhole /> },
	lockRuleDisabled: { label: <Lock /> },
};

export const QueryBuilderShadcn: QueryBuilderContextProvider =
	getCompatContextProvider({
		controlElements: shadcnControlElements,
		translations: shadcnTranslations,
	});
