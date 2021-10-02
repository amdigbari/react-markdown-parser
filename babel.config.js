const fs = require('fs');

const aliasesForAbsoluteImport = (() => {
    const basePath = './src';
    const joinPath = (...dir) => `${dir.filter((d) => typeof d === 'string').join('/')}`;

    const dirs = fs.readdirSync(basePath).filter((f) => fs.lstatSync(joinPath(basePath, f)).isDirectory());

    return dirs.reduce((prevAliases, dir) => ({ ...prevAliases, [dir]: joinPath(basePath, dir) }), {});
})();

const presets = ['@babel/preset-typescript', '@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]];

const plugins = [
    ['module-resolver', { root: './src', alias: aliasesForAbsoluteImport }],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
];

module.exports = { presets, plugins, sourceMaps: true };
