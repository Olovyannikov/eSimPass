const gulp = require('gulp');
const {series, parallel} = require('gulp');

const gulpClean = require('gulp-clean');

const fs = require('fs');
const proc = require('child_process');

const packageJson = JSON.parse(fs.readFileSync("package.json"));

var generateApi = require ('@glonassmobile/codebase/generator/generateApi').generate;
var execute = require ('@glonassmobile/codebase/execute').execute;

const clean = () => gulp.src([
    'build/*',
    'src/client/generated/*'

], {read: false}).pipe(gulpClean());

const createDirs = cb => fs.mkdir('src/client/generated', {recursive: true}, cb)

const generateClientApi = cb => generateApi (cb, './src/proto.proto', './src/client/generated', true);

const compileWeb = cb => execute (cb, 'node ./node_modules/webpack/bin/webpack.js --no-stats --config src/client/webpack.config.js');

const copyDockerToBuild = () => gulp.src("src/docker/*").pipe(gulp.dest('build'));

exports.default = series(
    createDirs,
    clean,
    createDirs,
    parallel (
        copyDockerToBuild,
        series (
            generateClientApi,
            compileWeb
        )
    )
)
