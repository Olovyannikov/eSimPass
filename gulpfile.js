const gulp = require('gulp');
const {series, parallel} = require('gulp');

const gulpClean = require('gulp-clean');

const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync("package.json"));

const generateGrpcApi = require ('@glonassmobile/codebase/generator/grpc/generateApi').generate;

const clean = () => gulp.src([
    './build',
    'src/client/generated'

], {read: false,allowEmpty : true}).pipe(gulpClean());

const createDirs = (cb) => {
    fs.mkdirSync('build', {recursive: true})
    fs.mkdirSync('src/client/generated', {recursive: true})

    cb ()
}

const generateClientApi = cb => generateGrpcApi (cb, './src/proto.proto', './src/client/generated', true);

const copyDockerToBuild = () => gulp.src("src/docker/*").pipe(gulp.dest('build'));

const generatePackageJson = (cb) => {

    fs.writeFileSync("build/package.json", JSON.stringify({
        name: packageJson.name,
        version: packageJson.version,
        dependencies : packageJson.devDependencies
    }, null, 4))

    fs.copyFileSync ("./yarn.lock", "./build/yarn.lock")

    cb ()
};

exports.default = series(
    createDirs,
    clean,
    createDirs,
    parallel (
        copyDockerToBuild,
        generateClientApi,
        generatePackageJson
    )
)
