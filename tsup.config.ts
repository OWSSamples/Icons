import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // ✅ Generación de tipos activada
  splitting: false,
  sourcemap: true, // ✅ Sourcemap para debugging
  clean: true,
  target: 'es2019',
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.legalComments = 'none';
    options.logOverride = { 'css-syntax-error': 'silent' };
    options.jsx = 'automatic';
    options.chunkNames = 'chunks/[name]-[hash]';
    // Optimizaciones de memoria
    options.keepNames = false;
    options.mangleProps = false;
  },
  esbuildPlugins: [],
  workerThreads: false,
  tsconfig: 'tsconfig.json',
  external: ['react'],
  outDir: 'dist',
  outExtension({ format }) {
    return { js: format === 'esm' ? '.mjs' : '.cjs' };
  },
});


