const path = require('path');

const OUTPUT_FOLDER = path.join(__dirname, 'dist');

const TEMPLATE_FOLDER = path.join(__dirname, 'pages');
const TEMPLATE_PATH = path.join(TEMPLATE_FOLDER, '/**/*.pug');
const TEMPLATE_OUTPUT = OUTPUT_FOLDER;

const STYLE_FOLDER = path.join(__dirname, 'styles/entrypoints');
const STYLE_PATH = path.join(STYLE_FOLDER, '/**/*.scss');
const STYLE_OUTPUT = path.join(OUTPUT_FOLDER, 'styles');

const CONFIG = {
  OUTPUT_FOLDER,
  TEMPLATE_FOLDER,
  TEMPLATE_PATH,
  TEMPLATE_OUTPUT,
  STYLE_FOLDER,
  STYLE_PATH,
  STYLE_OUTPUT
};

module.exports = CONFIG;
