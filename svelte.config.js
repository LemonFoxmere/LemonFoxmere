import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		if (warning.code === "css-unused-selector" || warning.code.startsWith("a11y-")) {
			return;
		}
		handler(warning);
	},

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		alias: {
			$static: "./static",
			$comp: "$lib/comp",
			$route: "src/routes"
		}
	},

	compilerOptions: {
		warningFilter: (warning) => warning.code !== "a11y_missing_attribute"
	},

	vitePlugin: {
		onwarn(warning, defaultHandler) {
			if (warning.code === "css_unused_selector" || warning.code.startsWith("a11y-")) return;
			defaultHandler(warning);
		}
	}
};

export default config;
