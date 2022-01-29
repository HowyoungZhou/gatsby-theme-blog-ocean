module.exports = (options) => {
  const {
    postsPathTemplate = '/:lang?/posts/:segment+',
    languages = ['en'],
    defaultLanguage = 'en',
    siteUrl = "https://www.example.com",
    localeKey = 'locales',
    i18nOptions,
    rssPath = 'rss.xml',
    rssTitle
  } = options;

  return {
    siteMetadata: {
      siteUrl: siteUrl,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-theme-material-ui`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [".md", ".mdx"],
          remarkPlugins: [
            // We will migrate to rehype-slug when Gatsby supports ESM
            require(`remark-slug`)
          ],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/locales`,
          name: localeKey
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: localeKey, // name given to `gatsby-source-filesystem` plugin.
          languages,
          defaultLanguage,
          // if you are using Helmet, you must include siteUrl, and make sure you add http:https
          siteUrl: siteUrl,
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
      },
      {
        resolve: `gatsby-plugin-feed-mdx`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }`,
          feeds: [
            {
              serialize: ({ query: { allBlogPost } }) =>
                allBlogPost.nodes.map(post => ({
                  title: post.title,
                  description: post.excerpt,
                  date: post.date,
                  url: new URL(post.slug, siteUrl).href,
                  guid: post.id,
                  custom_elements: [{ "content:encoded": post.html }]
                })),
              query: `
                {
                  allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
                    nodes {
                      id
                      excerpt
                      body
                      html
                      slug
                      title
                      date
                    }
                  }
                }
              `,
              output: rssPath,
              title: rssTitle
            }
          ]
        }
      },
    ]
  };
}
