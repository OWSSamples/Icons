import { defineConfig } from 'tsup';

export default defineConfig({
  // Solo compilar los archivos principales para el paquete CDN
  entry: ['src/index.ts'],
  // Bundle simple para el paquete CDN
  bundle: true,
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2019',
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.legalComments = 'none';
    options.logOverride = { 'css-syntax-error': 'silent' };
    options.jsx = 'automatic';
    // Optimizaciones de memoria
    options.keepNames = false;
    // mangleProps debe ser un RegExp o undefined, no false
    delete options.mangleProps;
  },
  esbuildPlugins: [],
  workerThreads: false,
  tsconfig: 'tsconfig.json',
  external: ['react'],
  outDir: 'dist',
  // Emitir .js para alinear con package.json (exports -> *.js)
  outExtension() {
    return { js: '.js' };
  },
});
