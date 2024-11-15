import React from "react";
import type { ShiftActionsProps } from "react-querybuilder";
import { Button } from "./ui/button";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

export const ShadcnShiftActions = ({
	shiftUp,
	shiftDown,
	shiftUpDisabled,
	shiftDownDisabled,
	disabled,
	className,
	labels,
	titles,
	testID,
}: ShiftActionsProps): React.JSX.Element => (
	<div data-testid={testID} className={className}>
		<Button
			variant="default"
			size="sm"
			title={titles?.shiftUp}
			onClick={shiftUp}
			disabled={disabled || shiftUpDisabled}
			className="w-6 h-6 mb-1"
		>
			<ArrowBigUpDash />
		</Button>
		<Button
			variant="default"
			size="sm"
			title={titles?.shiftDown}
			onClick={shiftDown}
			disabled={disabled || shiftDownDisabled}
			className="w-6 h-6 space-y-1 mt-1"
		>
			<ArrowBigDownDash />
		</Button>
	</div>
);
