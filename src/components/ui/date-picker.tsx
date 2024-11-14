import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	date: Date;
	onChange?: (date: Date | null) => void;
	className?: string;
	format?: string;
	disabled?: boolean;
	placeholder?: string;
}

export function DatePicker({
	date: initialDate,
	onChange,
	className,
	format: dateFormat = "PPP",
	disabled = false,
	placeholder,
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date>(initialDate);

	const handleDateChange = (date: any) => {
		const selectedDate = date ? date.toDate() : null;
		setDate(selectedDate);
		if (onChange) onChange(selectedDate);
	};

	return (
		<Popover>
			<PopoverTrigger className={className} disabled={disabled} asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, dateFormat)
					) : (
						<span>{placeholder || "Pick a date"}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
