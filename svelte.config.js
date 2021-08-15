import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
// import node from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		target: '#svelte',
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		})
	},

	preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
