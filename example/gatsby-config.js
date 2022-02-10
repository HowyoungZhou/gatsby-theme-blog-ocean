module.exports = {
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
        path: `${__dirname}/posts`,
        name: `posts`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locales`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-theme-blog-ocean`,
      options: {
        title: 'Ocean Blog',
        description: 'Here is the description of the site.',
        siteUrl: 'https://www.howyoung.dev',
        languages: ['en', 'zh'],
        localesSource: 'locales'
      }
    }
  ],
}
