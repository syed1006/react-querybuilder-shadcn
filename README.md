Here’s a **README** template for your library:

---

# Shadcn Components for React-QueryBuilder

A library of Shadcn-based components for seamlessly integrating with [React-QueryBuilder](https://react-querybuilder.js.org/). Inspired by the excellent work in [react-querybuilder/antd](https://github.com/react-querybuilder/react-querybuilder/tree/main/packages/antd), this library provides a customizable and aesthetic interface using Shadcn UI principles.

---

## Acknowledgments

This project stands on the shoulders of giants. A huge thank you to the [React-QueryBuilder](https://react-querybuilder.js.org/) team for their incredible tool that simplifies query building. Your dedication to open source has made this library possible.

We would also like to extend our gratitude to the [Shadcn](https://ui.shadcn.com/) team for their stunning, modern UI component framework, which serves as the foundation for this library’s visual design.

Special thanks to the creators of [react-querybuilder/antd](https://github.com/react-querybuilder/react-querybuilder/tree/main/packages/antd), whose implementation inspired and informed this project. Your work continues to set a high bar for quality and usability in the React ecosystem.

---

## Features

-   Prebuilt Shadcn components designed specifically for `react-querybuilder`.
-   Fully customizable styling and functionality.
-   Aesthetic, modern UI with Shadcn principles at its core.

---

## Installation

```bash
npm install react-querybuilder-shadcn react-querybuilder
```

### Peer Dependencies

This library requires the following Radix UI primitives to be installed in your project:

-   `@radix-ui/react-checkbox`
-   `@radix-ui/react-dialog`
-   `@radix-ui/react-label`
-   `@radix-ui/react-popover`
-   `@radix-ui/react-radio-group`
-   `@radix-ui/react-select`
-   `@radix-ui/react-separator`
-   `@radix-ui/react-slot`
-   `@radix-ui/react-switch`

You can install them via:

```bash
npm install @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch
```

---

---

## Usage

```tsx
import { QueryBuilderShadcn } from "react-querybuilder-shadcn";
import { useState } from "react";
import {
	type Field,
	QueryBuilder,
	type RuleGroupType,
} from "react-querybuilder";

const fields: Field[] = [
	{ name: "firstName", label: "First Name" },
	{ name: "lastName", label: "Last Name" },
];

export function App() {
	const [query, setQuery] = useState<RuleGroupType>({
		combinator: "and",
		rules: [],
	});

	return (
		<QueryBuilderShadcn>
			<QueryBuilder
				fields={fields}
				defaultQuery={query}
				onQueryChange={setQuery}
			/>
		</QueryBuilderShadcn>
	);
}
```

`QueryBuilderShadcn` is a React context provider that assigns the following props to all descendant `QueryBuilder` elements. The props can be overridden on the `QueryBuilder` or used directly without the context provider.

| Export                  | `QueryBuilder` prop             |
| ----------------------- | ------------------------------- |
| `shadcnControlElements` | `controlElements`               |
| `shadcnTranslations`    | `translations`                  |
| `ShadcnActionElement`   | `controlElements.actionElement` |
| `ShadcnDragHandle`      | `controlElements.dragHandle`    |
| `ShadcnNotToggle`       | `controlElements.notToggle`     |
| `ShadcnShiftActions`    | `controlElements.shiftActions`  |
| `ShadcnValueEditor`     | `controlElements.valueEditor`   |
| `ShadcnValueSelector`   | `controlElements.valueSelector` |

---

> [!TIP]
>
> By default, this package uses icons from `lucid-react` for button labels. To reset button labels to their default strings, use `defaultTranslations` from `react-querybuilder`.
>
> ```tsx
> <QueryBuilderShadcn translations={defaultTranslations}>
> ```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve this library.
