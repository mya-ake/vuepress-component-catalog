const { join, resolve } = require('path');
const { parse } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

const {
  getFilePathList,
  readFile,
  extractFileName,
  writeFile,
} = require('./../lib/file');

/** paths */
const projectDir = resolve(__dirname, '..', '..');
const srcDir = join(projectDir, 'src');
const distDir = join(projectDir, 'docs', 'components');
const componetDestDir = join(projectDir, 'docs', '.vuepress', 'components');
const componentsDir = join(srcDir, 'components');

/** helpers */
const isVueFile = path => /\.vue$/.test(path);

const extractDoc = customBlocks => {
  return customBlocks.find(block => block.type === 'doc');
};

const buildScript = scriptBlock => {
  return `<script>${scriptBlock.content.replace(/^(\/\/\n)+/, '')}</script>`;
};

const buildStyles = styleBlocks => {
  let styles = '';
  for (const block of styleBlocks) {
    styles += `<style ${block.scoped ? 'scoped' : ''}>${block.content.replace(
      /^\n+/,
      '\n',
    )}</style>`;
  }
  return styles;
};

/** process */
const componentPaths = getFilePathList(componentsDir).filter(isVueFile);

const targetPath = componentPaths[0];
const targetFilename = extractFileName(targetPath);
const source = readFile(targetPath);

const descriptor = parse({
  source,
  compiler,
  filename: targetFilename,
});

const doc = extractDoc(descriptor.customBlocks);

const distFilename = join(distDir, 'base-button.md');
writeFile(distFilename, doc.content);

const componentSource = `<template>${descriptor.template.content}</template>

${buildScript(descriptor.script)}

${buildStyles(descriptor.styles)}
`;

const componentDestFilePath = join(componetDestDir, targetFilename);
writeFile(componentDestFilePath, componentSource);
