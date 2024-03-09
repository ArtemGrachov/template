const path = require('path');

const OUTPUT_FOLDER = path.join(__dirname, 'dist');
const TEMPLATE_FOLDER = path.join(__dirname, 'pages');
const TEMPLATE_PATH = path.join(TEMPLATE_FOLDER, '/**/*.pug');
const TEMPLATE_OUTPUT = OUTPUT_FOLDER;

const CONFIG = {
  OUTPUT_FOLDER,
  TEMPLATE_FOLDER,
  TEMPLATE_PATH,
  TEMPLATE_OUTPUT
};

module.exports = CONFIG;
