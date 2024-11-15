import QueryBuilder, {
	formatQuery,
	getCompatContextProvider,
	RuleGroupType,
} from "react-querybuilder";

import "react-querybuilder-shadcn/dist/style.css";
import { fields } from "./fields";
import { useState } from "react";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import { QueryBuilderShadcn } from "./index";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import * as ReactDnD from "react-dnd";
const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
function App() {
	const [query, setQuery] = useState(initialQuery);
	const [query2, setQuery2] = useState(initialQuery);
	return (
		<>
			<QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
				<QueryBuilderShadcn>
					<QueryBuilder
						query={query}
						onQueryChange={setQuery}
						fields={fields}
						showShiftActions
						showNotToggle
					/>
				</QueryBuilderShadcn>
			</QueryBuilderDnD>
			<code>{formatQuery(query, "sql")}</code>
			<QueryBuilderAntD>
				<QueryBuilder
					query={query2}
					onQueryChange={setQuery2}
					fields={fields}
					showShiftActions
					showNotToggle
				/>
			</QueryBuilderAntD>
			<code>{formatQuery(query2, "sql")}</code>
		</>
	);
}

export default App;
