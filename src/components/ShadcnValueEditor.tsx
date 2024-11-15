import * as React from "react";
import type { ValueEditorProps } from "react-querybuilder";
import { useValueEditor, ValueEditor } from "react-querybuilder";
import { DatePicker } from "./ui/date-picker";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { DateRangePicker } from "./ui/date-picker-with-range";
import DateTimePickerPopover from "./ui/date-time-picker-popover";
import { TimePicker } from "./ui/time-picker";
import { format, parse, isMatch } from "date-fns";
import {
	DATE_FORMAT,
	DATE_TIME_FORMAT,
	ONE,
	TIME_FORMAT,
	ZERO,
} from "@/constants";
import { Components, Operators } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShadcnValueEditorProps = ValueEditorProps & {
	extraProps?: Record<string, any>;
};

export const ShadcnValueEditor = (
	allProps: ShadcnValueEditorProps
): React.JSX.Element | null => {
	const {
		fieldData,
		operator,
		value,
		handleOnChange,
		title,
		className,
		type,
		inputType,
		values = [],
		listsAsArrays,
		separator,
		valueSource: _vs,
		disabled,
		testID,
		selectorComponent: _SelectorComponent,
		extraProps,
		parseNumbers: _parseNumbers,

		..._propsForValueSelector
	} = allProps;

	const { valueAsArray, multiValueHandler, valueListItemClassName } =
		useValueEditor(allProps);

	if (operator === Operators.NULL || operator === Operators.NOT_NULL) {
		return null;
	}

	console.log(valueAsArray);

	const placeHolderText = fieldData?.placeholder ?? "";
	const inputTypeCoerced = [
		Operators.IN as string,
		Operators.NOT_IN as string,
	].includes(operator)
		? Components.TEXT
		: inputType || Components.TEXT;

	if (
		(operator === Operators.BETWEEN ||
			operator === Operators.NOT_BETWEEN) &&
		(type === Components.SELECT || type === Components.TEXT) &&
		// Date ranges are handled differently in AntD--see below
		inputTypeCoerced !== Components.DATE &&
		inputTypeCoerced !== Components.DATETIME_LOCAL
	) {
		if (type === Components.TEXT) {
			const editors = ["from", "to"].map((key, i) => {
				if (inputTypeCoerced === Components.TIME) {
					const selectedValue = valueAsArray[i]
						? isMatch(valueAsArray[i], TIME_FORMAT)
							? parse(valueAsArray[i], TIME_FORMAT, new Date())
							: parse(
									format(valueAsArray[i], TIME_FORMAT),
									TIME_FORMAT,
									new Date()
							  )
						: new Date();
					return (
						<TimePicker
							date={selectedValue}
							className={className}
							disabled={disabled}
							setDate={(d) =>
								multiValueHandler(
									d ? format(d, TIME_FORMAT) : "",
									i
								)
							}
							{...extraProps}
						/>
					);
				} else if (inputTypeCoerced === Components.NUMBER) {
					return (
						<Input
							type="number"
							onChange={(e) =>
								handleOnChange(parseFloat(e.target.value))
							}
							placeholder={placeHolderText}
							disabled={disabled}
							value={value}
							title={title}
							className={className}
							{...extraProps}
						/>
					);
				}
				return (
					<Input
						key={key}
						type={inputTypeCoerced}
						value={valueAsArray[i] ?? ""}
						className={valueListItemClassName}
						disabled={disabled}
						placeholder={placeHolderText}
						onChange={(e) => multiValueHandler(e.target.value, i)}
						{...extraProps}
					/>
				);
			});
			return (
				<span
					data-testid={testID}
					className={`flex ${className}`}
					title={title}
				>
					{editors[ZERO]}
					{separator}
					{editors[ONE]}
				</span>
			);
		}

		return <ValueEditor {...allProps} skipHook />;
	}

	switch (type) {
		case Components.SELECT:
		case Components.MULTISELECT:
			return <ValueEditor {...allProps} skipHook />;

		case Components.TEXTAREA:
			return (
				<Textarea
					value={value as string}
					onChange={(e) => handleOnChange(e.target.value)}
					placeholder={placeHolderText}
					disabled={disabled}
					className={className}
					title={title}
					{...extraProps}
				/>
			);

		case Components.SWITCH:
			return (
				<Switch
					checked={value as boolean}
					onCheckedChange={(v) => handleOnChange(v)}
					disabled={disabled}
					title={title}
					className={className}
					{...extraProps}
				/>
			);

		case Components.CHECKBOX:
			return (
				<span title={title} className={className}>
					<Checkbox
						checked={value as boolean}
						onCheckedChange={(v) => handleOnChange(v)}
						disabled={disabled}
						{...extraProps}
					/>
					<Label htmlFor="checkbox">{placeHolderText}</Label>
				</span>
			);

		case Components.RADIO:
			return (
				<RadioGroup
					value={value as string}
					onValueChange={handleOnChange}
					disabled={disabled}
					className={`flex ${className}`}
				>
					{values.map((v, idx) => (
						<div
							key={v.name}
							className="flex items-center space-x-2"
						>
							<RadioGroupItem
								checked={value === v.name}
								value={v.name}
								id={`${v.value}-${idx}`}
							/>
							<Label htmlFor={`${v.value}-${idx}`}>
								{v.label}
							</Label>
						</div>
					))}
				</RadioGroup>
			);
	}

	switch (inputTypeCoerced) {
		case Components.DATE:
			const selectedValue = value
				? Array.isArray(value)
					? isMatch(value[ZERO], DATE_FORMAT)
						? parse(value[ZERO], DATE_FORMAT, new Date())
						: parse(
								format(value[ZERO], DATE_FORMAT),
								DATE_FORMAT,
								new Date()
						  )
					: isMatch(value, DATE_FORMAT)
					? parse(value, DATE_FORMAT, new Date())
					: parse(format(value, DATE_FORMAT), DATE_FORMAT, new Date())
				: new Date();

			return (
				<DatePicker
					date={selectedValue}
					onChange={(v) => handleOnChange(format(v, DATE_FORMAT))}
					disabled={disabled}
					className={className}
					placeholder={placeHolderText}
				/>
			);
		case Components.DATETIME_LOCAL: {
			if (
				operator === Operators.BETWEEN ||
				operator === Operators.NOT_BETWEEN
			) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const dateArr = valueAsArray
					? [new Date(valueAsArray[0]), new Date(valueAsArray[1])]
					: [new Date(), new Date()];
				return (
					<DateRangePicker
						onUpdate={({ range }) =>
							handleOnChange([
								range.from.toISOString(),
								range.to?.toISOString(),
							])
						}
						initialDateFrom={dateArr[0]}
						initialDateTo={dateArr[1]}
						align="start"
						locale="en-US"
						showCompare={false}
						disabled={disabled}
						className={className}
						{...extraProps}
					/>
				);
			}

			const selectedValue = value
				? Array.isArray(value)
					? isMatch(value[ZERO], DATE_TIME_FORMAT)
						? parse(value[ZERO], DATE_TIME_FORMAT, new Date())
						: parse(
								format(value[ZERO], DATE_TIME_FORMAT),
								DATE_TIME_FORMAT,
								new Date()
						  )
					: isMatch(value, DATE_TIME_FORMAT)
					? parse(value, DATE_TIME_FORMAT, new Date())
					: parse(
							format(value, DATE_TIME_FORMAT),
							DATE_TIME_FORMAT,
							new Date()
					  )
				: new Date();

			return (
				<DateTimePickerPopover
					selected={selectedValue}
					setDate={(v) => handleOnChange(format(v, DATE_TIME_FORMAT))}
					disabled={disabled}
					className={className}
					placeholder={placeHolderText}
				/>
			);
		}

		case Components.TIME: {
			let convertedValue = value;
			if (
				convertedValue &&
				!Array.isArray(convertedValue) &&
				convertedValue.includes(",")
			) {
				convertedValue = convertedValue.split(",");
			}
			const selectedValue = convertedValue
				? Array.isArray(convertedValue)
					? isMatch(convertedValue[ZERO], TIME_FORMAT)
						? parse(convertedValue[ZERO], TIME_FORMAT, new Date())
						: parse(
								format(convertedValue[ZERO], TIME_FORMAT),
								TIME_FORMAT,
								new Date()
						  )
					: isMatch(convertedValue, TIME_FORMAT)
					? parse(convertedValue, TIME_FORMAT, new Date())
					: parse(
							format(convertedValue, TIME_FORMAT),
							TIME_FORMAT,
							new Date()
					  )
				: new Date();

			return (
				<TimePicker
					date={selectedValue}
					className={className}
					disabled={disabled}
					setDate={(d) =>
						handleOnChange(d ? format(d, TIME_FORMAT) : "")
					}
					{...extraProps}
				/>
			);
		}

		case Components.NUMBER: {
			return (
				<Input
					type="number"
					onChange={(e) => handleOnChange(parseFloat(e.target.value))}
					placeholder={placeHolderText}
					disabled={disabled}
					value={value}
					title={title}
					className={className}
					{...extraProps}
				/>
			);
		}
	}

	return (
		<Input
			type={inputTypeCoerced}
			value={value}
			title={title}
			className={className}
			disabled={disabled}
			placeholder={placeHolderText}
			onChange={(e) => handleOnChange(e.target.value)}
			{...extraProps}
		/>
	);
};
