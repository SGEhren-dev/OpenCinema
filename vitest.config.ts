import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		globals: true,
		resolveSnapshotPath: (testPath, snapshotExtension) =>
			testPath.replace(/\\/g, "/").replace("__tests__", "__tests__/__snapshots__") + snapshotExtension,
		coverage: {
			provider: "istanbul",
			enabled: true,
			reportsDirectory: "coverage"
		},
		exclude: [ "node_modules" ],
		globalSetup: "./vitest/globalSetup.ts"
	},
	plugins: [ tsConfigPaths() ]
});
