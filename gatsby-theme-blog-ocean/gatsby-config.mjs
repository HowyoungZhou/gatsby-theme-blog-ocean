import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (options) => {
  const {
    postsPathTemplate = '/:lang?/posts/:segment+',
    languages = ['en'],
    defaultLanguage = 'en',
    title = 'Ocean Blog',
    description = 'A theme of blog and personal homepage for Gatsby.',
    siteUrl = "https://www.example.com",
    localesSource = 'builtin-locales',
    i18nOptions = {},
    rssPath = 'rss.xml',
    rssTitle,
    maxImageWidth = 1920,
    manifest = {}
  } = options;

  return {
    siteMetadata: {
      title,
      description,
      siteUrl,
    },
    plugins: [
      `gatsby-plugin-react-helmet`, // deprecate after Head API becomes usable
      `gatsby-plugin-material-ui`,
      {
        resolve: `gatsby-plugin-webfonts`,
        options: {
          fonts: {
            google: [
              {
                family: `Roboto`,
                variants: [`300`, `400`, `500`],
              },
            ],
          },
        },
      },
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [".md", ".mdx"],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: maxImageWidth,
                linkImagesToOriginal: true,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkMath,
            ],
            rehypePlugins: [
              rehypeSlug,
              rehypeMathJax,
            ],
          }
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/locales`,
          name: `builtin-locales`,
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: localesSource, // name given to `gatsby-source-filesystem` plugin.
          languages,
          defaultLanguage,
          redirect: false,
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
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: title,
          short_name: title,
          description,
          start_url: `/`,
          background_color: `#ffffff`,
          display: `standalone`,
          theme_color_in_head: false,
          icon: `${__dirname}/static/icons/icon.svg`,
          icon_options: {
            purpose: `any maskable`,
          },
          ...manifest
        },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // WARN: list it after gatsby-plugin-manifest
      `gatsby-plugin-offline`,
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
                  custom_elements: [{ "content:encoded": post.body }]
                })),
              query: `
                {
                  allBlogPost(sort: [{date: DESC}, {title: ASC}], limit: 1000) {
                    nodes {
                      id
                      excerpt
                      body
                      slug
                      title
                      date
                    }
                  }
                }
              `,
              output: rssPath,
              title: rssTitle || title
            }
          ]
        }
      },
    ]
  };
}
