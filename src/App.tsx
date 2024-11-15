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
const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
function App() {
	const [query, setQuery] = useState(initialQuery);
	const [query2, setQuery2] = useState(initialQuery);
	return (
		<>
			<QueryBuilderShadcn>
				<QueryBuilder
					query={query}
					onQueryChange={setQuery}
					fields={fields}
					showShiftActions
					showNotToggle
				/>
			</QueryBuilderShadcn>
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
