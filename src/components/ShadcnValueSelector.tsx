import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import type { VersatileSelectorProps } from "react-querybuilder";
import { useValueSelector } from "react-querybuilder";
import { toOptions } from "./utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { MultiSelect } from "./ui/multi-select";

export type ShadcnValueSelectorProps = VersatileSelectorProps &
	Omit<ComponentPropsWithoutRef<typeof Select>, "onChange" | "defaultValue">;

export const ShadcnValueSelector = ({
	className,
	handleOnChange,
	options,
	value,
	title,
	disabled,
	multiple,
	listsAsArrays,
	// Props that should not be in extraProps
	testID: _testID,
	rule: _rule,
	rules: _rules,
	level: _level,
	path: _path,
	context: _context,
	validation: _validation,
	operator: _operator,
	field: _field,
	fieldData: _fieldData,
	schema: _schema,
	...extraProps
}: ShadcnValueSelectorProps): React.JSX.Element => {
	const { onChange, val } = useValueSelector({
		handleOnChange,
		listsAsArrays,
		multiple,
		value,
	});

	function mapToMultiSelectOptions(items: any[]) {
		return items.map((item) => ({
			label: item.label || item.name || item.title || "Unknown",
			value: item.value || item.id || item.key || "unknown",
			icon: item.icon, // only map if it exists, or remove this if unnecessary
		}));
	}

	const transformedOptions = mapToMultiSelectOptions(options);

	return (
		<span>
			{multiple ? (
				<MultiSelect
					onValueChange={onChange}
					options={transformedOptions}
					className={className}
					placeholder={title || "Select Value"}
					disabled={disabled}
					value={val}
				/>
			) : (
				<Select
					disabled={disabled}
					value={val as string}
					onValueChange={onChange}
					{...extraProps}
				>
					<SelectTrigger className="w-auto min-w-20 min-h-6">
						<SelectValue placeholder={title || "Select Value"} />
					</SelectTrigger>
					<SelectContent className={className}>
						{toOptions(options)}
					</SelectContent>
				</Select>
			)}
		</span>
	);
};
