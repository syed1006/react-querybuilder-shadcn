import * as React from "react";
import type { OptionList } from "react-querybuilder";
import { isOptionGroupArray } from "react-querybuilder";
import { SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { generateUniqueId } from "@/lib/utils";

export { isOptionGroupArray };

export const ToOptions = (arr?: OptionList): React.JSX.Element[] | null =>
	isOptionGroupArray(arr)
		? arr.map((og) => {
				const groupId = `${og.label}-${generateUniqueId()}`;
				return (
					<SelectGroup key={groupId}>
						<SelectLabel>{og.label}</SelectLabel>
						{og.options.map((opt) => {
							const itemId = `${opt.name}-${generateUniqueId()}`;
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
				);
		  })
		: Array.isArray(arr)
		? arr.map((opt, idx) => (
				<SelectItem
					/* @ts-ignore */
					key={`${opt.label}-${idx}`}
					/* @ts-ignore */
					value={opt.value}
				>
					{/* @ts-ignore */}
					{opt.label}
				</SelectItem>
		  ))
		: null;
