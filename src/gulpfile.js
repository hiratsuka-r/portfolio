"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

//sass -> css(minify) -> output:dist
gulp.task("sass", () => {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(cleanCss())
    .pipe(gulp.dest("../dist/css"));
});

//js -> js(minify) -> output:dist
gulp.task("js-minify", () => {
  return gulp
    .src("js/**/*.js")
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("../dist/js"));
});

gulp.task("build", gulp.series("sass", "js-minify"));
