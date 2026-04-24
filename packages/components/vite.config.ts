import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: false,
            exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts', 'src/test-setup.ts'],
        }),
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'lm-prototype-button': resolve(__dirname, 'src/button/lm-prototype-button.ts'),
                'lm-prototype-dropdown': resolve(__dirname, 'src/dropdown/lm-prototype-dropdown.ts')
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['lit', /^lit\//, /^@lit\//, /^@lm-prototype\//],
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});