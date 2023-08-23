export default {
  siteMetadata: {
    author: 'Howyoung',
    social: [
      {
        name: `GitHub`,
        url: `https://github.com/HowyoungZhou`,
      },
      {
        name: `Email`,
        url: `mailto:me@howyoung.dev`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `posts`,
        name: `posts`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `locales`,
        name: `locales`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-theme-blog-ocean`,
      options: {
        title: 'Ocean Blog',
        description: 'Here is the description of the site.',
        siteUrl: 'https://www.howyoung.dev',
        languages: ['en', 'zh-CN'],
        localesSource: 'locales',
        giscusOptions: {
          repo: "giscus/giscus-component",
          repoId: "MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA=",
          category: "Announcements",
          categoryId: "DIC_kwDOF1L2fM4B-hVS",
          mapping: "specific",
          term: "Welcome to @giscus/react component!",
        }
      }
    }
  ],
}
