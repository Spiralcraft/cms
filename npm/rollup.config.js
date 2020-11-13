import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import multiInput from 'rollup-plugin-multi-input';
import cloneDeep from 'clone-deep';
import path from 'path';

const production = true;

const template= {
  output: {
    sourcemap: true,
    format: 'esm',
    name: "applet"
  },
  plugins: [
    ,svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: css => {
        css.write("applet.css");
        
        }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte','svelte/internal'],
      customResolveOptions: {
        moduleDirectory: path.resolve('node_modules')
      }      
    }),
    commonjs(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ]
};
  


const admin= cloneDeep(template);
admin.input="../src-js/war-js/admin/applet.js";
admin.output.dir="../package/war-js/admin";

export default [admin];
