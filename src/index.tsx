import type {
	ControlElementsProp,
	FullField,
	QueryBuilderContextProvider,
} from "react-querybuilder";
import {
	defaultTranslations,
	getCompatContextProvider,
} from "react-querybuilder";
import { ShadcnValueSelector } from "./components/ShadcnValueSelector";
import { ShadcnValueEditor } from "./components/ShadcnValueEditor";
import "react-querybuilder/dist/query-builder-layout.css";
import "./index.min.css";
import { ShadcnShiftActions } from "./components/ShadcnShiftActions";
import { ShadcnNotToggle } from "./components/ShadcnNotToggle";
import { ShadcnDragHandle } from "./components/ShadcnDragHandle";

export * from "./types";
export * from "./constants";
export * from "./components/ShadcnValueSelector";
export * from "./components/ShadcnValueEditor";
export * from "./components/ShadcnShiftActions";
export * from "./components/ShadcnNotToggle";
export * from "./components/ShadcnDragHandle";

export const shadcnControlElements: ControlElementsProp<FullField, string> = {
	valueSelector: ShadcnValueSelector,
	valueEditor: ShadcnValueEditor,
	shiftActions: ShadcnShiftActions,
	notToggle: ShadcnNotToggle,
	dragHandle: ShadcnDragHandle,
};

export const QueryBuilderShadcn: QueryBuilderContextProvider =
	getCompatContextProvider({
		controlElements: shadcnControlElements,
		translations: defaultTranslations,
	});
