import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import type { ActionWithRulesProps } from "react-querybuilder";
import { Button } from "./ui/button";

// TODO: This may be unnecessary. Find out if there's a way to allow
// `data-${string}` index keys without breaking other type constraints.
// this will remove all the keys which is of `data-${string}` pattern
type RemoveDataIndexKeys<T> = {
	[K in keyof T as K extends `data-${string}` ? never : K]: T[K];
};

export type ShadcnActionElementProps = ActionWithRulesProps &
	RemoveDataIndexKeys<ComponentPropsWithoutRef<typeof Button>>;

export const ShadcnActionElement = ({
	className,
	handleOnClick,
	label,
	title,
	disabled,
	disabledTranslation,
	type,
	// Props that should not be in extraProps
	testID: _testID,
	rules: _rules,
	level: _level,
	path: _path,
	context: _context,
	validation: _validation,
	ruleOrGroup: _ruleOrGroup,
	schema: _schema,
	...extraProps
}: ShadcnActionElementProps): React.JSX.Element => (
	<Button
		variant="default"
		className={className}
		title={
			disabledTranslation && disabled ? disabledTranslation.title : title
		}
		onClick={(e) => handleOnClick(e)}
		disabled={disabled && !disabledTranslation}
		{...extraProps}
	>
		{disabledTranslation && disabled ? disabledTranslation.label : label}
	</Button>
);
