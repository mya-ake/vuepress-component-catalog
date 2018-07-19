const { join, resolve } = require('path');
const { parse } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const babel = require('babel-core');

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

const buildDoc = (docBlock, componentObject) => {
  let doc = `${docBlock.content}\n`;
  if ('props' in componentObject) {
    doc += `## Porps
| prop | type | required | default |
|:---:|:---:|:---:|:---:|\n`;
    Object.entries(componentObject.props).forEach(([key, value]) => {
      doc += `| ${key} | ${value.type.name} | ${Boolean(
        value.required,
      )} | ${String(value.default) || 'undefined'} |`;
    });
  }
  return doc;
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

// Transform Source to JS Object
const { code } = babel.transform(descriptor.script.content, {
  babelrc: false,
  presets: ['env'],
});
const componentObject = eval(code);

// Create Markdown
const docBlock = extractDoc(descriptor.customBlocks);
const doc = buildDoc(docBlock, componentObject);

const distFilename = join(distDir, 'base-button.md');
writeFile(distFilename, doc);

// Copy Component
const componentSource = `<template>${descriptor.template.content}</template>

${buildScript(descriptor.script)}

${buildStyles(descriptor.styles)}
`;

const componentDestFilePath = join(componetDestDir, targetFilename);
writeFile(componentDestFilePath, componentSource);
