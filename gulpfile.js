const gulp = require('gulp');
const {series, parallel} = require('gulp');

const gulpClean = require('gulp-clean');

const fs = require('fs');
const proc = require('child_process');

const packageJson = JSON.parse(fs.readFileSync("package.json"));

var generateApi = require ('@glonassmobile/codebase/generator/generateApi').generate;

const execute = (cb, command) => {
    const cmd = command.split (" ");

    const process = proc.spawn (cmd[0], cmd.slice (1, cmd.length))

    process.stderr.setEncoding('utf8');

    let error = ""

    process.stderr.on('data', data => {
        console.log (data)
        error += data.toString ();
    });


    process.stdout.on('data', (buffer) => {
        console.log (buffer.toString())
    })

    process.on ('exit', code => {
        if (code > 0) {
            cb (error)
        }
        else {
            cb ()
        }
    })
}

const clean = () => gulp.src([
    'build/*',
    'src/client/generated/*'

], {read: false}).pipe(gulpClean());

const createDirs = cb => {
    fs.mkdirSync('src/client/generated', {recursive: true})
    
    return cb();
};

const generateClientApi = cb => generateApi (cb, './src/proto', './src/client/generated', true);

const compileWeb = cb => execute (cb, 'node ./node_modules/webpack/bin/webpack.js --no-stats --config src/client/webpack.config.js');

const copyDockerToBuild = () => gulp.src("src/docker/*").pipe(gulp.dest('build'));

exports.default = series(
    createDirs,
    clean,
    createDirs,
    generateClientApi,
    copyDockerToBuild,
    compileWeb
)
