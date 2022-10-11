import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/material-jsoneditor.umd.js',
      format: 'umd',
      name: 'material-jsoneditor',
    },
  ],
  plugins: [typescript(), nodeResolve(), commonjs()],
};