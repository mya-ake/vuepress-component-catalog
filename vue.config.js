module.exports = {
  chainWebpack: config => {
    config.module
      .rule('doc')
      .oneOf('doc')
      .resourceQuery(/blockType=doc/)
      .use('through-loader')
      .loader(require.resolve('./loaders/through-loader.js'))
      .end();
  },
};
