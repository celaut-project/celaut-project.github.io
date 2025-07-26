import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const REPO_NAME = 'celaut-project.github.io'; 

export default defineConfig({
	plugins: [sveltekit()],
	base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
});