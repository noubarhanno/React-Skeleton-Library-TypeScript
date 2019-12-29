import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser"
import cleanup from 'rollup-plugin-cleanup';
import babel from 'rollup-plugin-babel';

import packageJSON from "./package.json";
const input = "./src/index.ts";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

const extensions = ['.js', '.jsx', '.ts', '.tsx']


export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      commonjs(),
      cleanup(),
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: "cjs"
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      commonjs(),
      uglify(),
      cleanup(),
    ]
  },
  // UMD
  {
    input,
    output: {
      file: packageJSON.browser,
      format: "umd",
      name: "reactNoubarButtons",
      external: ['react', '@emotion/styled', '@emotion/core', 'styled-system', '@emotion/styled-base'],
      globals: {
        "react": "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core",
        "styled-system": "styled",
        "@emotion/styled-base": "_styled",
      }
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      cleanup(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: "umd",
      name: "reactNoubarButtons",
      external: ['react', '@emotion/styled', '@emotion/core', 'styled-system','@emotion/styled-base'],
      globals: {
        "react": "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core",
        "@emotion/styled-base": "_styled",
        "styled-system": "styled"
      }
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      commonjs(),
      cleanup(),
      terser()
    ]
  },
  // ES
  {
    input,
    output: {
      file: packageJSON.module,
      format: "es",
      exports: "named",
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      cleanup(),
      commonjs()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: "es",
      exports: "named",
    },
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: 'src',
        },
        extensions
      }),
      typescript({
        typescript: require('typescript'),
      }),
      babel({
        extensions,
        include: ['src/**/*'],
        exclude: 'node_modules/**',
      }),
      external(),
      commonjs(),
      cleanup(),
      terser()
    ]
  }
];