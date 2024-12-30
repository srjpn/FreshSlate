import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import yaml from '@rollup/plugin-yaml';
import path from 'path';

export default {
  input: 'bin/freshslate.js', // Entry point of your application
  output: {
    file: 'dist/freshslate.bundle.js', // Output bundled file
    format: 'cjs', // CommonJS format
    sourcemap: true, // Optional: generate sourcemaps
  },
  plugins: [
    nodeResolve(), // Resolve node_modules dependencies
    commonjs({ 
      transformMixedEsModules: true // Handle mixed ES/CommonJS modules
    }),
    yaml(), // Handle YAML imports
    babel({
      exclude: 'node_modules/**', // Transpile source files except for node_modules
      babelHelpers: 'bundled', // Use bundled babel helpers
    }),
  ],
  external: [
    'events', 'path', 'fs', 'child_process', // Add Node.js built-in modules as external
  ],
  // Add this to ensure YAML files are included
  watch: {
    include: ['commands/**/*.yaml', 'configs/**/*']
  }
};
