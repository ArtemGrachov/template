const sass = require('sass');

const { handleFiles, writeFile } = require('./utils');

const { STYLE_FOLDER, STYLE_PATH, STYLE_OUTPUT } = require('../config');

async function compileStyles() {
  await handleFiles(STYLE_PATH, STYLE_FOLDER, async (fullPath, fileName, relativePath) => {
    const output = compileStyle(fullPath);
    await writeStyle(fileName, relativePath, output);
  });
};

function compileStyle(fullPath) {
  const result = sass.compile(fullPath);

  return result.css;
}

async function writeStyle(fileName, filePath, content) {
  const result = await writeFile(STYLE_OUTPUT, filePath, `${fileName}.css`, content);

  return result;
}

module.exports = {
  compileStyles
};
