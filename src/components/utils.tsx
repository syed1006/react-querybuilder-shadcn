import * as React from "react";
import type { OptionList } from "react-querybuilder";
import { isOptionGroupArray } from "react-querybuilder";
import { SelectGroup, SelectItem, SelectLabel } from "./ui/select";

export { isOptionGroupArray };

export const toOptions = (arr?: OptionList): React.JSX.Element[] | null =>
	isOptionGroupArray(arr)
		? arr.map((og) => (
				<SelectGroup key={og.label}>
					<SelectLabel>{og.label}</SelectLabel>
					{og.options.map((opt) => (
						<>
							{opt.name && (
								<SelectItem key={opt.name} value={opt.name}>
									{opt.label}
								</SelectItem>
							)}
						</>
					))}
				</SelectGroup>
		  ))
		: Array.isArray(arr)
		? arr.map((opt) => (
				/* @ts-ignore */
				<SelectItem key={opt.label} value={opt.value}>
					{/* @ts-ignore */}
					{opt.label}
				</SelectItem>
		  ))
		: null;
