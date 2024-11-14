import type {
	ControlElementsProp,
	FullField,
	QueryBuilderContextProvider,
} from "react-querybuilder";
import {
	getCompatContextProvider,
	defaultControlElements,
} from "react-querybuilder";
import { ShadcnValueSelector } from "./components/ShadcnValueSelector";

export * from "./components/ShadcnValueSelector";

import "./index.min.css";
import "react-querybuilder/dist/query-builder-layout.css";

export const shadcnControlElements: ControlElementsProp<FullField, string> = {
	...defaultControlElements,
	valueSelector: ShadcnValueSelector,
};

export const QueryBuilderShadcn: QueryBuilderContextProvider =
	getCompatContextProvider({
		controlElements: shadcnControlElements,
	});
