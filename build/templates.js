const pug = require('pug');

const { handleFiles, writeFile } = require('./utils');

const { TEMPLATE_PATH, TEMPLATE_FOLDER, TEMPLATE_OUTPUT } = require('../config');

async function compileTemplates() {
  await handleFiles(TEMPLATE_PATH, TEMPLATE_FOLDER, async (fullPath, fileName, relativePath) => {
    const output = compileTemplate(fullPath);
    await writeTemplate(fileName, relativePath, output);
  });
};

function compileTemplate(fullPath) {
  const compiledFunction = pug.compileFile(fullPath);

  return compiledFunction();
}

async function writeTemplate(fileName, filePath, content) {
  const result = await writeFile(TEMPLATE_OUTPUT, filePath, `${fileName}.html`, content);

  return result;
}

module.exports = {
  compileTemplates
};
