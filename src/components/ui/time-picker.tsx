"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";
import { cn } from "@/lib/utils";

interface TimePickerProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	className?: string;
	disabled?: boolean;
}

export function TimePicker({
	date,
	setDate,
	disabled,
	className,
}: TimePickerProps) {
	const minuteRef = React.useRef<HTMLInputElement>(null);
	const hourRef = React.useRef<HTMLInputElement>(null);
	const secondRef = React.useRef<HTMLInputElement>(null);

	return (
		<div className="flex items-end gap-2 ">
			<div className={cn("grid gap-1 text-center", className)}>
				<TimePickerInput
					picker="hours"
					date={date}
					setDate={setDate}
					ref={hourRef}
					onRightFocus={() => minuteRef.current?.focus()}
					disabled={disabled}
				/>
				<Label htmlFor="hours" className="text-xs">
					Hours
				</Label>
			</div>
			<div className="grid gap-1 text-center">
				<TimePickerInput
					picker="minutes"
					date={date}
					setDate={setDate}
					ref={minuteRef}
					onLeftFocus={() => hourRef.current?.focus()}
					onRightFocus={() => secondRef.current?.focus()}
					disabled={disabled}
				/>
				<Label htmlFor="minutes" className="text-xs">
					Minutes
				</Label>
			</div>
			<div className="grid gap-1 text-center">
				<TimePickerInput
					picker="seconds"
					date={date}
					setDate={setDate}
					ref={secondRef}
					onLeftFocus={() => minuteRef.current?.focus()}
					disabled={disabled}
				/>
				<Label htmlFor="seconds" className="text-xs">
					Seconds
				</Label>
			</div>
			<div className="flex h-10 items-center">
				<Clock className="ml-2 h-4 w-4" />
			</div>
		</div>
	);
}
