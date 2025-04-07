import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    build: {
        manifest: 'manifest.json',
        // outDir: 'public/build',
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },

    },
    server: {
        // https: true,
        // host: '0.0.0.0',
        // hmr: {
        //     host: 'localhost'
        // },
        cors: true,
    },
});
