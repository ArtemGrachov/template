const { clean, createOutputFolders } = require('./build/utils');
const { compileTemplates } = require('./build/templates');

async function build() {
  await clean();
  await createOutputFolders();
  await compileTemplates();
}

build();
