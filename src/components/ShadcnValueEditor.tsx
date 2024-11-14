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
import { isValid, parseISO } from "date-fns";

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

	if (operator === "null" || operator === "notNull") {
		return null;
	}

	const placeHolderText = fieldData?.placeholder ?? "";
	const inputTypeCoerced = ["in", "notIn"].includes(operator)
		? "text"
		: inputType || "text";

	if (
		(operator === "between" || operator === "notBetween") &&
		(type === "select" || type === "text") &&
		// Date ranges are handled differently in AntD--see below
		inputTypeCoerced !== "date" &&
		inputTypeCoerced !== "datetime-local"
	) {
		if (type === "text") {
			const editors = ["from", "to"].map((key, i) => {
				if (inputTypeCoerced === "time") {
					const selectedValue = value
						? Array.isArray(value)
							? new Date(value[0])
							: new Date(value)
						: new Date();
					return (
						<DatePicker
							date={selectedValue}
							onChange={(v) => handleOnChange(v?.toISOString())}
							disabled={disabled}
							className={className}
							placeholder={placeHolderText}
						/>
					);
				} else if (inputTypeCoerced === "number") {
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
				<span data-testid={testID} className={className} title={title}>
					{editors[0]}
					{separator}
					{editors[1]}
				</span>
			);
		}

		return <ValueEditor {...allProps} skipHook />;
	}

	switch (type) {
		case "select":
		case "multiselect":
			return <ValueEditor {...allProps} skipHook />;

		case "textarea":
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

		case "switch":
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

		case "checkbox":
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

		case "radio":
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
		case "date":
			const selectedValue = value
				? Array.isArray(value)
					? new Date(value[0])
					: new Date(value)
				: new Date();
			return (
				<DatePicker
					date={selectedValue}
					onChange={(v) => handleOnChange(v?.toISOString())}
					disabled={disabled}
					className={className}
					placeholder={placeHolderText}
				/>
			);
		case "datetime-local": {
			if (operator === "between" || operator === "notBetween") {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const dateArr = valueAsArray
					? [new Date(valueAsArray[0]), new Date(valueAsArray[0])]
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
						locale="en-GB"
						showCompare={false}
						disabled={disabled}
						className={className}
						{...extraProps}
					/>
				);
			}

			const selectedValue = value
				? Array.isArray(value)
					? new Date(value[0])
					: new Date(value)
				: new Date();

			return (
				<DateTimePickerPopover
					selected={selectedValue}
					setDate={(v) => handleOnChange(v?.toISOString())}
					disabled={disabled}
					className={className}
					placeholder={placeHolderText}
				/>
			);
		}

		case "time": {
			const timeFormatRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
			let dateValue = parseISO(value);
			if (value && timeFormatRegex.test(value)) {
				const [hours, minutes, seconds] = value.split(":").map(Number);

				dateValue = new Date();
				dateValue.setHours(hours, minutes, seconds, 0);
			}

			return (
				<TimePicker
					date={isValid(dateValue) ? dateValue : undefined}
					className={className}
					disabled={disabled}
					setDate={(d) =>
						handleOnChange(d ? d.toTimeString().split(" ")[0] : "")
					}
					{...extraProps}
				/>
			);
		}

		case "number": {
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
