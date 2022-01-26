// Dependencies
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import * as esbuild from 'esbuild';
import alias from 'esbuild-plugin-alias';
import path from 'path';

let __dirname = path.resolve();

async function build() {
  const mode = process.env.NODE_ENV
    ? process.env.NODE_ENV.toLowerCase()
    : 'development';

  console.log(`Building Worker in ${mode} mode`);

  const outfile = './dist/worker.js';
  const startTime = Date.now();
  const result = await esbuild.build({
    entryPoints: ['./worker/index.ts'],
    bundle: true,
    minify: mode === 'production',
    sourcemap: true,
    format: 'esm',
    metafile: true,
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      __dirname: JSON.stringify(__dirname),
    },
    plugins: [
      NodeModulesPolyfillPlugin(),
      alias({
        '@prisma/client': require.resolve('@prisma/client'),
      }),
    ],
    inject: ['./other/process-env-shim.js'],
    outfile,
  });
  const endTime = Date.now();

  console.log(`Built in ${endTime - startTime}ms`);

  if (mode === 'production') {
    console.log(await esbuild.analyzeMetafile(result.metafile));
  }
}

build().catch((e) => console.error('Unknown error caught during build:', e));
