import { GripVertical } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import * as React from "react";
import { forwardRef } from "react";
import type { DragHandleProps } from "react-querybuilder";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ShadcnDragHandleProps = DragHandleProps &
	ComponentPropsWithRef<typeof GripVertical>;

export const ShadcnDragHandle: React.ForwardRefExoticComponent<
	DragHandleProps & React.RefAttributes<HTMLElement>
> = forwardRef<HTMLElement, DragHandleProps>(
	(
		{
			className,
			title,
			// Props that should not be in extraProps
			testID: _testID,
			level: _level,
			path: _path,
			label: _label,
			disabled: _disabled,
			context: _context,
			validation: _validation,
			schema: _schema,
			ruleOrGroup: _ruleOrGroup,
			...extraProps
		},
		dragRef
	) => {
		const spanProps = extraProps as React.HTMLAttributes<HTMLSpanElement>;
		return (
			<span
				ref={dragRef}
				className={className}
				title={title}
				draggable
				{...spanProps}
			>
				<GripVertical className="cursor-move" />
			</span>
		);
	}
);
