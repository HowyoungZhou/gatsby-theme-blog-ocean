import { graphql } from "gatsby"
import PostPage from "./post"

export default PostPage

export const query = graphql`
  query PostPageQuery(
    $id: String!
    $previousId: String
    $nextId: String
    $maxWidth: Int
    $language: String!
  ) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      tags
      date(formatString: "MMMM DD, YYYY")
      image {
        childImageSharp {
          gatsbyImageData(
            width: $maxWidth
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      imageAlt
      imageCaptionText
      imageCaptionLink
      socialImage {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      tableOfContents
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    theme: sitePlugin(name: {eq: "gatsby-theme-blog-ocean"}) {
      pluginOptions
    }
  }
`
