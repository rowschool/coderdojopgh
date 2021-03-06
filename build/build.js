// node build/build.js -d cwd -p "src/views/partials/**/*.hbs" -l "src/views/layouts/**/*.hbs" -t "src/views/templates/**/*.hbs" -v

let commander = require("commander");
let config = require("../build/config");
let handlebarsToHtml = require("../build/handlebars-to-html");

commander
  .usage("-templates <pattern> -d <path>")
  .description("Write handlebars templates to a directory as static html.")
  .option("-d, --directory", "output directory")
  .option("-H, --helpers", "path to JavaScript file containing helpers")
  .option("-p, --partials [pattern]", "glob pattern to match partial files")
  .option("-l, --layouts [pattern]", "glob pattern to match layout files")
  .option("-t, --templates <pattern>", "glob pattern to match template files")
  .option("-v, --verbose", "output more information to console")
  .parse(process.argv);

if (commander.verbose) {
    process.env.debug = true;
}

if (commander.partials) {
    handlebarsToHtml.registerPartials(commander.partials, config.partialsFolder);
}

if (commander.layouts) {
    handlebarsToHtml.registerPartials(commander.layouts, config.layoutsFolder);
}

handlebarsToHtml.writeFiles(commander.templates, config.templatesFolder);
