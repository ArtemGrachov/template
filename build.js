const { clean, createOutputFolders } = require('./build/utils');
const { compileTemplates } = require('./build/templates');
const { compileStyles } = require('./build/styles');
const { compileScripts  } = require('./build/scripts');

async function build() {
  await clean();
  await createOutputFolders();
  await compileTemplates();
  await compileStyles();
  await compileScripts();
}

build();
