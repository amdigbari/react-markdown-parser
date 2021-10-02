import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                dir: 'dist/cjs',
                format: 'cjs',
            },
            {
                dir: 'dist/es',
                format: 'es',
                exports: 'named',
            },
        ],
        plugins: [
            eslint(),
            postcss({ modules: true, minimize: true }),
            commonjs(),
            ts(),
            babel({ babelHelpers: 'bundled', extensions, exclude: ['node_modules'] }),
            external(),
            resolve({ extensions }),
            terser(),
        ],
    },
];
