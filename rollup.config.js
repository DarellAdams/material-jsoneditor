import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/material-jsoneditor.umd.js',
      format: 'umd',
      name: 'material-jsoneditor',
    },
  ],
  plugins: [typescript()],
};