module.exports = {
  siteMetadata: {
    title: 'Ocean Blog',
    author: 'Howyoung',
    description: 'A Gatsby theme for oceanic design',
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
      resolve: `gatsby-theme-blog-ocean`,
      options: {
        languages: ['en', 'zh']
      }
    }
  ],
}
