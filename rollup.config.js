import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser'
import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
  // ESM build for web
{
  input: 'src/index.ts',
  output: {
    file: packageJson.module,
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    external(),
    resolve({ extensions }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'react-native-web']
},
  // Native build (without react-native replacement)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/native/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      external(),
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      }),
      terser()
    ],
    external: ['react', 'react-native']
  }
];