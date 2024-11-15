import QueryBuilder, {
	formatQuery,
	getCompatContextProvider,
	RuleGroupType,
} from "react-querybuilder";

import "react-querybuilder-shadcn/dist/style.css";
import { useState } from "react";
import { QueryBuilderShadcn } from ".";
const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
import type { Field, RuleType } from "react-querybuilder";
import { defaultOperators, toFullOption } from "react-querybuilder";
// Adapted from https://en.wikipedia.org/wiki/List_of_musical_instruments
import type { OptionGroup } from "react-querybuilder";

export const musicalInstruments: OptionGroup[] = [
	{
		label: "Percussion instruments",
		instruments: [
			"Clapstick",
			"Cowbell",
			"Cymbal",
			"Gong",
			"Maraca",
			"Marimba",
			"More cowbell",
			"Spoon",
			"Steelpan",
			"Tambourine",
			"Triangle",
			"Vibraphone",
			"Washboard",
			"Wood block",
			"Wooden fish",
			"Xylophone",
		],
	},
	{
		label: "Membranophones",
		instruments: [
			"Barrel drum",
			"Bass drum",
			"Bongo drums",
			"Conga",
			"Drum",
			"Drum kit",
			"Jew's harp",
			"Octaban",
			"Samphor",
			"Snare drum",
			"Timpani",
			"Tom-tom",
		],
	},
	{
		label: "Wind instruments",
		instruments: [
			"Accordion",
			"Air horn",
			"Bagpipe",
			"Baritone horn",
			"Bassoon",
			"Bazooka",
			"Beatboxing",
			"Blown bottle",
			"Bugle",
			"Clarinet",
			"Conch",
			"Cornet",
			"Didgeridoo",
			"Double bell euphonium",
			"Doulophone",
			"English horn",
			"Euphonium",
			"Flugelhorn",
			"Flute",
			"French horn",
			"Harmonica",
			"Irish flute",
			"Jug",
			"Kazoo",
			"Melodeon",
			"Mezzo-soprano",
			"Oboe",
			"Ocarina",
			"Pan flute",
			"Piccolo",
			"Pipe organ",
			"Recorder",
			"Saxophone",
			"Slide whistle",
			"Sousaphone",
			"Trombone",
			"Trumpet",
			"Tuba",
			"Whistle",
		],
	},
	{
		label: "Stringed instruments",
		instruments: [
			"Aeolian harp",
			"Bandolin",
			"Banjo ukulele",
			"Cello",
			"Chapman stick",
			"Clavichord",
			"Clavinet",
			"Double bass",
			"Dulcimer",
			"Fiddle",
			"Guitar",
			"Hammered dulcimer",
			"Harp",
			"Harpsichord",
			"Lute",
			"Lyre",
			"Maguhu",
			"Mandola",
			"Mandolin",
			"Octobass",
			"Piano",
			"Sitar",
			"Ukulele",
			"Viol",
			"Violin",
			"Washtub bass",
		],
	},
	{
		label: "Electronic instruments",
		instruments: [
			"AlphaSphere",
			"Audiocubes",
			"Bass pedals",
			"Continuum Fingerboard",
			"Croix Sonore",
			"Denis d'or",
			"Dubreq stylophone",
			"Drum machine",
			"Eigenharp",
			"Electric guitar",
			"Electronic keyboard",
			"Electronic organ",
			"EWI",
			"Fingerboard synthesizer",
			"Hammond organ",
			"Keyboard",
			"Keytar",
			"Kraakdoos",
			"Laser harp",
			"Mellotron",
			"MIDI keyboard",
			"Omnichord",
			"Ondes Martenot",
			"Otamatone",
			"Sampler",
			"Seaboard music instrument",
			"Skoog",
			"Synclavier",
			"Synthesizer",
			"Teleharmonium",
			"Tenori-on",
			"Theremin",
			"trautonium",
			"Turntablism",
			"Turntable",
		],
	},
].map(({ label, instruments }) => ({
	label,
	options: instruments.map((s) => ({ name: s, label: s })),
}));

export const validator = (r: RuleType) => !!r.value;

export const fields = (
	[
		{
			name: "firstName",
			label: "First Name",
			placeholder: "Enter first name",
			validator,
		},
		{
			name: "lastName",
			label: "Last Name",
			placeholder: "Enter last name",
			defaultOperator: "beginsWith",
			validator,
		},
		{ name: "age", label: "Age", inputType: "number", validator },
		{
			name: "isMusician",
			label: "Is a musician",
			valueEditorType: "checkbox",
			// @ts-ignore
			operators: defaultOperators.filter((op) => op.name === "="),
			defaultValue: false,
		},
		{
			name: "instrument",
			label: "Primary instrument",
			valueEditorType: "select",
			values: musicalInstruments,
			defaultValue: "Cowbell",
			// @ts-ignore
			operators: defaultOperators.filter((op) => op.name === "="),
		},
		{
			name: "alsoPlays",
			label: "Also plays",
			valueEditorType: "multiselect",
			values: musicalInstruments,
			defaultValue: "More cowbell",
			// @ts-ignore
			operators: defaultOperators.filter((op) => op.name === "in"),
		},
		{
			name: "gender",
			label: "Gender",
			// @ts-ignore
			operators: defaultOperators.filter((op) => op.name === "="),
			valueEditorType: "radio",
			values: [
				{ name: "M", label: "Male" },
				{ name: "F", label: "Female" },
				{ name: "O", label: "Other" },
			],
		},
		{ name: "height", label: "Height", validator },
		{ name: "job", label: "Job", validator },
		{
			name: "description",
			label: "Description",
			valueEditorType: "textarea",
		},
		{ name: "birthdate", label: "Birth Date", inputType: "date" },
		{ name: "datetime", label: "Show Time", inputType: "datetime-local" },
		{ name: "alarm", label: "Daily Alarm", inputType: "time" },
		{
			name: "groupedField1",
			label: "Grouped Field 1",
			comparator: "groupNumber",
			groupNumber: "group1",
			valueSources: ["field", "value"],
		},
		{
			name: "groupedField2",
			label: "Grouped Field 2",
			comparator: "groupNumber",
			groupNumber: "group1",
			valueSources: ["field", "value"],
		},
		{
			name: "groupedField3",
			label: "Grouped Field 3",
			comparator: "groupNumber",
			groupNumber: "group1",
			valueSources: ["field", "value"],
		},
		{
			name: "groupedField4",
			label: "Grouped Field 4",
			comparator: "groupNumber",
			groupNumber: "group1",
			valueSources: ["field", "value"],
		},
	] satisfies Field[]
).map((o) => toFullOption(o));

function App() {
	const [query, setQuery] = useState(initialQuery);
	return (
		<>
			<QueryBuilderShadcn>
				<QueryBuilder
					query={query}
					onQueryChange={setQuery}
					fields={fields}
				/>
			</QueryBuilderShadcn>
			<code>{formatQuery(query, "sql")}</code>
		</>
	);
}

export default App;
