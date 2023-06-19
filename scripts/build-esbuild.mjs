import path from 'path';
import fse from 'fs-extra';
import esbuild from 'esbuild';
import glob from 'glob-promise';
import nunjucks from 'nunjucks';

import 'dotenv/config';

const clientEnv = {};
for (const key in process.env) {
  if (key.indexOf('REACT_APP') === 0) {
    clientEnv[`process.env.${key}`] = `'${process.env[key]}'`;
  }
}

const paths = {
  appBuild: './build-esbuild',
  appPublic: './public-esbuild',
  appSrc: './src',
};

const groupBy = (items, cb) => {
  return items.reduce((acc, item) => {
    const key = cb(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};

(async () => {
  try {
    if (process.env.BUILD_PATH_ESBUILD) {
      paths.appBuild = process.env.BUILD_PATH_ESBUILD;
    }

    console.log(`Cleaning build path`);
    await fse.emptydir(paths.appBuild);

    console.log('Copy assets from public');
    await fse.copy(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== path.join(paths.appPublic, 'index.html'),
    });

    const extraLoaders = {};

    const unhandledFiles = await glob('**/*.!(js|jsx|ts|d.ts|tsx|css|json|txt)', {
      cwd: paths.appSrc,
    });
    for (const filePath of unhandledFiles) {
      const fileExtension = path.extname(filePath);

      if (!extraLoaders.hasOwnProperty(fileExtension)) {
        extraLoaders[fileExtension] = 'file';
      }
    }

    console.log('Compiling source code');
    await esbuild.build({
      entryPoints: ['./src/index.tsx'],
      outdir: paths.appBuild,
      entryNames: '[name]-[hash]',
      assetNames: 'assets/[name]-[hash]',
      minify: false,
      bundle: true,
      define: clientEnv,
      loader: {
        '.js': 'jsx',
        '.svg': 'file',
        '.png': 'file',
        ...extraLoaders,
      },
      jsxFactory: '__jsx',
      jsxFragment: '__Fragment',
      pure: ['__jsx'],
      inject: ['./react-shim.js'],
      tsconfig: './tsconfig.json',
      publicPath: '../',
    });

    const assetsMap = groupBy(await glob('*.{js,css}', { cwd: paths.appBuild }), file =>
      path.extname(file).substr(1),
    );

    console.log('Generating index.html');
    const html = nunjucks.render(path.join(paths.appPublic, 'index.html'), { assetsMap });
    await fse.writeFile(path.join(paths.appBuild, 'index.html'), html);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
