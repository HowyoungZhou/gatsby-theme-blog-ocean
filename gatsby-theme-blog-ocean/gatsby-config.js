module.exports = (options) => {
  const {
    postsPathTemplate = '/:lang?/posts/:segment+',
    languages = ['en'],
    defaultLanguage = 'en',
    i18nOptions
  } = options;

  return {
    plugins: [
      `gatsby-theme-material-ui`,
      `gatsby-plugin-mdx`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `locales`,
          name: `locales`
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: `locales`, // name given to `gatsby-source-filesystem` plugin.
          languages,
          defaultLanguage,
          // if you are using Helmet, you must include siteUrl, and make sure you add http:https
          // siteUrl: config.siteUrl,
          // you can pass any i18next options
          // pass following options to allow message content as a key
          i18nextOptions: {
            interpolation: {
              escapeValue: false // not needed for react as it escapes by default
            },
            keySeparator: false,
            nsSeparator: false
          },
          pages: [
            {
              matchPath: postsPathTemplate,
              getLanguageFromPath: true
            },
            {
              matchPath: '/:lang?/about-me',
              getLanguageFromPath: true
            }
          ],
          ...i18nOptions
        }
      }
    ]
  };
}
