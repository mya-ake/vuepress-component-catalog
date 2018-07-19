'use strict';

const fs = require('fs');
const { join } = require('path');

const getFilePathList = folderPath => {
  const paths = fs.readdirSync(folderPath);
  return paths.reduce((newPaths, filePath) => {
    const absoluteFilePath = join(folderPath, filePath);
    if (fs.statSync(absoluteFilePath).isDirectory()) {
      return newPaths.concat(getFilePathList(absoluteFilePath));
    } else {
      return newPaths.concat(absoluteFilePath);
    }
  }, []);
};

const readFile = path => {
  return fs.readFileSync(path, { encoding: 'utf8' });
};

const extractFileName = path => {
  return path.split('/').pop();
};

const writeFile = (path, data) => {
  return fs.writeFileSync(path, data, { encoding: 'utf8' });
};

module.exports = {
  getFilePathList,
  readFile,
  extractFileName,
  writeFile,
};
