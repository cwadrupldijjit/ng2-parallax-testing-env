import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
import * as sass from 'gulp-sass';
import * as watch from 'gulp-watch';
import * as sourcemaps from 'gulp-sourcemaps';
import * as changed from 'gulp-changed';

import { negatePaths } from './utilities';

let tsconfig = require('./tsconfig.json').compilerOptions;
let tsconfigServer = require('./tsconfig.server.json').compilerOptions;

tsconfig.typescript = require('typescript');
tsconfigServer.typescript = require('typescript');

const pathToPublic = __dirname + '/dist/';
const pathToSource = __dirname + '/src/';
const pathToServer = __dirname + '/server/';
const pathToNodeModules = __dirname + '/node_modules/';

const publicTypesecriptPaths = [pathToSource + '**/*.ts'];
const sassPaths = [pathToSource + '**/*.scss'];
const assetPaths = negatePaths(publicTypesecriptPaths).concat(negatePaths(sassPaths), [pathToSource + '**/*']);
const serverTypescriptPaths = negatePaths(pathToNodeModules + '/@types/core-js/index.d.ts')
        .concat([pathToServer + '**/*.ts']);

gulp.task('tsc-public', tsPublic);
gulp.task('sass', sassPublic);
gulp.task('copy-assets', copyAssets);
gulp.task('tsc-server', tsServer);
gulp.task('watch', watcher)
gulp.task('default', ['tsc-public', 'sass', 'copy-assets', 'tsc-server', 'watch']);

function tsPublic() {
    return gulp.src(publicTypesecriptPaths)
        .pipe(changed(pathToPublic))
        .pipe(sourcemaps.init())
            .pipe(tsc(tsconfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathToPublic));
}

function tsServer() {
    return gulp.src(serverTypescriptPaths)
        // .pipe(changed(pathToServer))
        .pipe(sourcemaps.init())
            .pipe(tsc(tsconfigServer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathToServer))
}

function sassPublic() {
    return gulp.src(sassPaths)
        .pipe(changed(pathToPublic))
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pathToPublic));
}

function copyAssets() {
    return gulp.src(assetPaths)
        .pipe(gulp.dest(pathToPublic));
}

function watcher() {
    watch(publicTypesecriptPaths, tsPublic);
    watch(sassPaths, sassPublic);
    watch(assetPaths, copyAssets);
    watch(serverTypescriptPaths, tsServer);
}