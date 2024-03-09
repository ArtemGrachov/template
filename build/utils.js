const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const CONFIG = require('../config');

function clean() {
  return new Promise((resolve, reject) => {
    fs.rm(CONFIG.OUTPUT_FOLDER, { recursive: true, force: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(CONFIG.OUTPUT_FOLDER);
      }
    });
  })
};

function createOutputFolders() {
  return new Promise((resolve, reject) => {
    fs.mkdir(CONFIG.OUTPUT_FOLDER, err => {
      if (err) {
        reject(err);
      } else {
        resolve(CONFIG.OUTPUT_FOLDER);
      }
    });
  })
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
    await new Promise((resolve, reject) => {
      fs.mkdir(outputDirPath, { recursive: true }, err => {
        if (err) {
          reject(err);
        } else {
          resolve(outputDirPath);
        }
      });
    })
  }

  const fileFullPath = path.join(outputDirPath, fileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(fileFullPath, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve(fileFullPath);
      }
    });
  });
}

module.exports = {
  clean,
  createOutputFolders,
  handleFiles,
  writeFile
};
