import * as React from "react";
import type { OptionList } from "react-querybuilder";
import { isOptionGroupArray } from "react-querybuilder";
import { SelectGroup, SelectItem, SelectLabel } from "./ui/select";

export { isOptionGroupArray };

export const toOptions = (arr?: OptionList): React.JSX.Element[] | null =>
	isOptionGroupArray(arr)
		? arr.map((og, idx) => (
				<SelectGroup key={`${og.label}-${idx}`}>
					<SelectLabel>{og.label}</SelectLabel>
					{og.options.map((opt, indx) => (
						<>
							{opt.name && (
								<SelectItem
									key={`${opt.name}-${indx}`}
									value={opt.name}
								>
									{opt.label}
								</SelectItem>
							)}
						</>
					))}
				</SelectGroup>
		  ))
		: Array.isArray(arr)
		? arr.map((opt, idx) => (
				/* @ts-ignore */
				<SelectItem key={`${opt.label}-${idx}`} value={opt.value}>
					{/* @ts-ignore */}
					{opt.label}
				</SelectItem>
		  ))
		: null;
