const { clean, createOutputFolders } = require('./build/utils');
const { compileTemplates } = require('./build/templates');
const { compileStyles } = require('./build/styles');

async function build() {
  await clean();
  await createOutputFolders();
  await compileTemplates();
  await compileStyles();
}

build();
