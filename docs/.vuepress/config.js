module.exports = {
  locales: {
    '/': {
      lang: 'ja',
      title: 'Component catalog',
      description: 'VuePressをコンポーネントのカタログとして使ってみる',
    }
  },
  themeConfig: {
    sidebar: [
      {
        title: 'Components',
        collapsable: false,
        children: [
          '/'
        ],
      },
    ],
  }
}
