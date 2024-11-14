import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DatetimePicker } from "./date-time-picker";
import { format } from "date-fns";
import { DayPickerSingleProps } from "react-day-picker";

export type DateTimePickerPopoverProps = Omit<
	DayPickerSingleProps,
	"mode" | "onSelect"
> & {
	setDate: (date: Date) => void;
	placeholder?: string;
	disabled?: boolean;
};

const DateTimePickerPopover = ({
	className,
	classNames,
	showOutsideDays = true,
	setDate: setGlobalDate,
	selected,
	placeholder,
	disabled,
	...props
}: DateTimePickerPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!selected && "text-muted-foreground"
					)}
					disabled={disabled}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selected ? (
						format(selected, "PPP HH:mm")
					) : (
						<span>{placeholder || "Pick a date"}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-4">
				<DatetimePicker
					selected={selected}
					setDate={setGlobalDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DateTimePickerPopover;
