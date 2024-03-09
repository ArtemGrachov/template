const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const CONFIG = require('../config');

async function clean() {
  await fs.promises.rm(CONFIG.OUTPUT_FOLDER, { recursive: true, force: true });
  return CONFIG.OUTPUT_FOLDER;
};

async function createOutputFolders() {
  await fs.promises.mkdir(CONFIG.OUTPUT_FOLDER);
  return CONFIG.OUTPUT_FOLDER;
};

function getFileName(filePath) {
  return filePath.split('/').slice(-1)[0].split('.')[0];
}

function getFileRelativePath(fileFullPath, basePath) {
  return path.relative(basePath, fileFullPath).split('/').slice(0, -1).join('/');
}

async function handleFiles(pth, basePath, callback) {
  const files = await glob(pth);

  await Promise.all(
    files.map(filePath => callback(
      filePath,
      getFileName(filePath),
      getFileRelativePath(filePath, basePath)
    ))
  );
}

async function writeFile(rootPath, dirPath, fileName, content) {
  const outputDirPath = path.join(rootPath, dirPath);

  const dirExist = fs.existsSync(outputDirPath);

  if (!dirExist) {
    await fs.promises.mkdir(outputDirPath, { recursive: true });
  }

  const fileFullPath = path.join(outputDirPath, fileName);

  await fs.promises.writeFile(fileFullPath, content);

  return fileFullPath;
}

module.exports = {
  clean,
  createOutputFolders,
  handleFiles,
  writeFile
};
