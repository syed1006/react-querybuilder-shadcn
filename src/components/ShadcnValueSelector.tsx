import type { ComponentPropsWithoutRef } from "react";
import * as React from "react";
import type { VersatileSelectorProps } from "react-querybuilder";
import { useValueSelector } from "react-querybuilder";
import { toOptions } from "./utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import {
	GroupMultiselectOption,
	MultiSelect,
	MultiselectOption,
} from "./ui/multi-select";

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

	function mapToMultiSelectOptions(
		items: any[]
	): Array<MultiselectOption | GroupMultiselectOption> {
		const transformedOptions: Array<
			MultiselectOption | GroupMultiselectOption
		> = [];

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.options) {
				const groupedOption: GroupMultiselectOption = {
					label: item.label,
					options: item.options.map((it: any) => ({
						label: it.label,
						value: it.name,
					})),
				};
				transformedOptions.push(groupedOption);
			} else {
				transformedOptions.push({
					label: item.label,
					value: item.name,
				});
			}
		}

		return transformedOptions;
	}

	const transformedOptions = mapToMultiSelectOptions(options);

	const handleMultiSelectChange = (values: any) => {
		handleOnChange(values);
	};

	return (
		<span>
			{multiple ? (
				<MultiSelect
					onValueChange={handleMultiSelectChange}
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
