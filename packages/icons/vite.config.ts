import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ rollupTypes: false })],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'ds-icon': resolve(__dirname, 'src/lm-prototype-icon.ts'),
                registry: resolve(__dirname, 'src/registry.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['lit', /^lit\//],
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});