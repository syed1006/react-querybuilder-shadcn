import * as React from "react";
import type { OptionList } from "react-querybuilder";
import { isOptionGroupArray } from "react-querybuilder";
import { SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { generateUniqueId } from "@/lib/utils";

export { isOptionGroupArray };

export interface ToOptionsProps {
	options: OptionList;
}

export const ToOptions = ({
	options,
}: ToOptionsProps): React.JSX.Element | null => {
	if (!options) return null;

	if (isOptionGroupArray(options)) {
		return (
			<>
				{options.map((og, groupIndex) => {
					const groupId = `group-${generateUniqueId()}`;
					return (
						<React.Fragment key={`group-${groupId}-${groupIndex}`}>
							<SelectGroup key={groupId}>
								<SelectLabel key={`label${groupId}`}>
									{og.label}
								</SelectLabel>
								{og.options.map((opt) => {
									const itemId = `${
										opt.name
									}-${generateUniqueId()}`;
									return (
										<>
											{opt.name && (
												<SelectItem
													key={itemId}
													value={opt.name}
												>
													{opt.label}
												</SelectItem>
											)}
										</>
									);
								})}
							</SelectGroup>
						</React.Fragment>
					);
				})}
			</>
		);
	}

	if (Array.isArray(options)) {
		return (
			<>
				{options.map((opt, idx) => (
					<SelectItem
						/* @ts-ignore */
						key={`${opt.label}-${idx}`}
						/* @ts-ignore */
						value={opt.value}
					>
						{/* @ts-ignore */}
						{opt.label}
					</SelectItem>
				))}
			</>
		);
	}
	return null;
};
