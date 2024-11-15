import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import type { NotToggleProps } from "react-querybuilder";
import { Switch } from "./ui/switch";

export type ShadcnNotToggleProps = NotToggleProps &
	ComponentPropsWithoutRef<typeof Switch>;

export const ShadcnNotToggle = ({
	className,
	handleOnChange,
	label,
	checked,
	title,
	disabled,
	// Props that should not be in extraProps
	path: _path,
	context: _context,
	validation: _validation,
	testID: _testID,
	schema: _schema,
	ruleGroup: _ruleGroup,
	...extraProps
}: ShadcnNotToggleProps): React.JSX.Element => (
	<Switch
		title={title}
		className={className}
		onCheckedChange={(v) => handleOnChange(v)}
		checked={!!checked}
		disabled={disabled}
		{...extraProps}
	/>
);
