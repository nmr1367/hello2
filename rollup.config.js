import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from "rollup-plugin-terser";
import svgr from "@svgr/rollup";

const packageJson = require("./package.json");

const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "./src/components/Button/styles/index.less"),
    "utf8"
  ),
  { resolveVariables: true, stripPrefix: true }
);

const input = "src/index.ts";

const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

const plugins = [
  // url({
  //   include: [
  //     "**/*.woff2",
  //     "**/*.woff",
  //     "**/*.ttf",
  //     "**/*.png",
  //     "**/*.jpg",
  //     "**/*.jpeg",
  //   ],
  //   limit: Infinity,
  // }),
  svgr(),
  json(),
  peerDepsExternal(),
  typescript({
    exclude: ["*.d.ts", "**/*.d.ts", "**/*.stories.tsx", "**/*.spec.tsx"],
    tsconfig: "./tsconfig.json",
    rollupCommonJSResolveHack: true,
    clean: true,
  }),
  babel({
    babelHelpers: "bundled",
    babelrc: false,
    plugins: [["import", { libraryName: "antd", style: true }]],
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
    exclude: ["node_modules/**", "public/**"],
  }),
  commonjs({
    include: "node_modules/**",
  }),
  postcss({
    use: [["less", {
      javascriptEnabled: true,
      modifyVars: themeVariables
    }]],
  }),
  terser()
];

export default [
  {
    input,
    output: {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
];