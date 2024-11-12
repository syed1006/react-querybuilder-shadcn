import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import type { VersatileSelectorProps } from "react-querybuilder";
import { useValueSelector } from "react-querybuilder";
import { toOptions } from "./utils";
import { Select, SelectContent } from "./ui/select";
import { MultiSelect } from "./ui/multi-select";

export type AntDValueSelectorProps = VersatileSelectorProps &
	Omit<ComponentPropsWithoutRef<typeof Select>, "onChange" | "defaultValue">;

export const AntDValueSelector = ({
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
}: AntDValueSelectorProps): React.JSX.Element => {
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
		<span title={title} className={className}>
			{multiple ? (
				<MultiSelect
					onValueChange={onChange}
					options={transformedOptions}
				/>
			) : (
				<Select
					disabled={disabled}
					value={val as string}
					onValueChange={onChange}
					{...extraProps}
				>
					<SelectContent>{toOptions(options)}</SelectContent>
				</Select>
			)}
		</span>
	);
};
