import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		coverage: {
			enabled: true,
		},
		include: ["src/**/*.test.{ts,tsx}"],
	},
});
