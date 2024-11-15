import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import { UserConfigExport } from "vite";
import { name } from "./package.json";

const config = async (): Promise<UserConfigExport> => {
	const formattedName = name.match(/[^/]+$/)?.[0] ?? name;

	return defineConfig({
		plugins: [
			react(),
			dts({
				insertTypesEntry: true,
				rollupTypes: true,
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		css: {
			postcss: {
				plugins: [tailwindcss],
			},
		},
		build: {
			lib: {
				entry: path.resolve(__dirname, "src/index.tsx"),
				name: formattedName,
				formats: ["es", "umd"],
				fileName: (format: string) => `${formattedName}.${format}.js`,
			},
			cssCodeSplit: false,
			rollupOptions: {
				external: [
					"react",
					"react/jsx-runtime",
					"react-dom",
					"tailwindcss",
					"react-querybuilder",
					"@radix-ui/react-checkbox",
					"@radix-ui/react-dialog",
					"@radix-ui/react-label",
					"@radix-ui/react-popover",
					"@radix-ui/react-radio-group",
					"@radix-ui/react-select",
					"@radix-ui/react-separator",
					"@radix-ui/react-slot",
					"@radix-ui/react-switch",
					"date-fns",
					"lucide-react",
				],
				output: {
					globals: {
						react: "React",
						"react/jsx-runtime": "react/jsx-runtime",
						"react-dom": "ReactDOM",
						tailwindcss: "tailwindcss",
						"react-querybuilder": "ReactQueryBuilder",
						"@radix-ui/react-checkbox": "ReactCheckbox",
						"@radix-ui/react-dialog": "ReactDialog",
						"@radix-ui/react-label": "ReactLabel",
						"@radix-ui/react-popover": "ReactPopover",
						"@radix-ui/react-radio-group": "ReactRadioGroup",
						"@radix-ui/react-select": "ReactSelect",
						"@radix-ui/react-separator": "ReactSeparator",
						"@radix-ui/react-slot": "ReactSlot",
						"@radix-ui/react-switch": "ReactSwitch",
						"date-fns": "DateFns",
						"lucide-react": "LucidReact",
					},
					exports: "named",
				},
			},
		},
		test: {
			globals: true,
			environment: "jsdom",
		},
	});
};
// https://vitejs.dev/config/
export default config;
