const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const replace = require('@rollup/plugin-replace');

const packageJson = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = [
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
    })
  ],
  external: ['react', 'react-dom', 'react-native-web']
},
  // CJS build for web
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.main,
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
      })
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
      })
    ],
    external: ['react', 'react-native']
  }
];