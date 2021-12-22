module.exports = (options) => {
  return {
    plugins: [
      `gatsby-theme-material-ui`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/locales`,
          name: `locale`
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
          languages: [`en`, `zh`, `jp`],
          defaultLanguage: 'en',
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
              matchPath: '/:lang?/posts/:uid',
              getLanguageFromPath: true
            },
            {
              matchPath: '/:lang?/about-me',
              getLanguageFromPath: true
            }
          ]
        }
      }
    ]
  };
}
