"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

//sass -> css(minify) -> output:docs
const sassTask = () => {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(cleanCss())
    .pipe(gulp.dest("../docs/css"));
};

//js -> js(minify) -> output:docs
const jsMinifyTask = () => {
  return gulp
    .src("js/**/*.js")
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("../docs/js"));
};

const copyDataTask = () => {
  return gulp
    .src("data/**/*.json")
    .pipe(gulp.dest("../docs/data"));
};

gulp.task("sass", sassTask);
gulp.task("js_minify", jsMinifyTask);
gulp.task("copy_data", copyDataTask);
gulp.task("build", gulp.series("sass", "js_minify", "copy_data"));
gulp.task("watch", () => {
  gulp.watch("sass/**/*.scss", gulp.series("sass"));
  gulp.watch("js/**/*.js", gulp.series("js_minify"));
  gulp.watch("data/**/*.json", gulp.series("copy_data"));
});
