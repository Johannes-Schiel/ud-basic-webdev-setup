import { defineConfig } from 'vitest/config';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	test: {
		include: ['**/js/*.test.js'],
		globals: true,
		reporters: 'verbose',
		environment: 'jsdom'
	},
	root: 'src',
	build: {
		emptyOutDir: true,
		outDir: '../dist'
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer({})
			]
		}
	}
});
