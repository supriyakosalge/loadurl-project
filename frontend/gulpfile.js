//all the variables and properties form following plugin are going to be assigned to corrosponding variable.

var gulp = require("gulp"),
  gutil = require("gulp-util"),
  concat = require("gulp-concat"),
  connect = require("gulp-connect");

var jsSources = ["components/scripts/get-images.js"];
var cssSources = ["components/styles/*.css"];
var htmlSources = ["components/*.html"];

gulp.task("log", function() {
  gutil.log("workflows are awesome!");
});

gulp.task("js", function() {
  gulp
    .src(jsSources)
    .pipe(concat("script.js"))
    .pipe(gulp.dest("builds/development/js"))
    .pipe(connect.reload());
});

gulp.task("html", function() {
  gulp
    .src(htmlSources)
    .pipe(concat("index.html"))
    .pipe(gulp.dest("builds/development/"))
    .pipe(connect.reload());
});

gulp.task("css", function() {
  gulp
    .src(cssSources)
    .pipe(concat("style.css"))
    .pipe(gulp.dest("builds/development/css"))
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch(jsSources, ["js"]);
  gulp.watch(cssSources, ["css"]);
  gulp.watch(htmlSources, ["html"]);
});

gulp.task("default", ["js", "html", "css", "watch", "connect", "log"]);

gulp.task("connect", function() {
  connect.server({
    root: "builds/development/",
    port: 3000,
    livereload: true
  });
});
