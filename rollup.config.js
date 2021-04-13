import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import styles from 'rollup-plugin-styles';
import notify from 'rollup-plugin-notify';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const moduleName = 'FlasherNotyf';
const inputFileName = 'src/index.ts';

const globals = {
  jquery: '$',
  '@flasher/flasher': 'Flasher',
};

export default [
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        file: pkg.main,
        format: 'umd',
        globals,
      },
      {
        name: moduleName,
        file: pkg.main.replace('.js', '.min.js'),
        format: 'umd',
        globals,
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
    ],
    external: [
      '@flasher/flasher', 'jquery',
    ],
    plugins: [
      notify(),
      resolve(),
      commonjs(),
      typescript(),
      styles(),
    ],
  },
  {
    input: inputFileName,
    plugins: [
      notify(),
      resolve(),
      commonjs(),
      typescript(),
      styles(),
    ],
    output: [
      { file: pkg.main.replace('.js', '.cjs.js'), format: 'cjs', globals, exports: 'auto' },
      { file: pkg.main.replace('.js', '.es.js'), format: 'es', globals },
    ],
  },
];
