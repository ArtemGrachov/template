const fs = require('fs');

const { handleFiles, writeFile } = require('./utils');

const { SCRIPTS_FOLDER, SCRIPTS_PATH, SCRIPTS_OUTPUT } = require('../config');

async function compileScripts() {
  await handleFiles(SCRIPTS_PATH, SCRIPTS_FOLDER, async (fullPath, fileName, relativePath) => {
    const output = await compileScript(fullPath);
    await writeScript(fileName, relativePath, output);
  });
};

async function compileScript(fullPath) {
  const code = await fs.promises.readFile(fullPath, { encoding: 'utf-8' });

  return code;
}

async function writeScript(fileName, filePath, content) {
  const result = await writeFile(SCRIPTS_OUTPUT, filePath, `${fileName}.js`, content);

  return result;
}

module.exports = {
  compileScripts
};
