const sass = require('sass');

const { handleFiles, writeFile } = require('./utils');

const { STYLE_FOLDER, STYLE_PATH, STYLE_OUTPUT } = require('../config');

async function compileStyles() {
  await handleFiles(STYLE_PATH, STYLE_FOLDER, async (fullPath, fileName, relativePath) => {
    const output = compileStyle(fullPath);
    let css = output.css
    css += `\n/*# sourceMappingURL=${fileName}.css.map */`;

    await writeStyle(fileName, relativePath, css);
    await writeSourcmap(fileName, relativePath, JSON.stringify(output.sourceMap));
  });
};

function compileStyle(fullPath) {
  const result = sass.compile(fullPath, { sourceMap: true, style: 'compressed' });
  return result;
}

async function writeStyle(fileName, filePath, content) {
  const result = await writeFile(STYLE_OUTPUT, filePath, `${fileName}.css`, content);

  return result;
}

async function writeSourcmap(fileName, filePath, content) {
  const result = await writeFile(STYLE_OUTPUT, filePath, `${fileName}.css.map`, content);

  return result;
}

module.exports = {
  compileStyles
};
