import Masonry from '@mui/lab/Masonry';
import Typography from '@mui/material/Typography';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import Banner from '../components/banner';
import Card from "../components/card";
import Footer from '../components/footer';
import Seo from '../components/seo';
import SocialIcons from "../components/social-icons";
import { Post } from '../model/post';

const cardSpacing = { xs: 1, sm: 2, md: 3 };

interface Data {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
      social: {
        name: string;
        url: string
      }[]
    }
  }
  allBlogPost: {
    nodes: Post[];
  }
};

export default function Index({ data }: { data: Data }) {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("Home")} />
      <Banner>
        <Typography variant="h3">
          {t('greeting', "Hi! I'm {{ author }}.", { author: data.site.siteMetadata.author })}
        </Typography>
        <Typography variant="h5">
          {t('description', data.site.siteMetadata.description) /* i18next-extract-disable-line */}
        </Typography>
        <SocialIcons social={data.site.siteMetadata.social} />
      </Banner>

      {/* Masonry behaves incorrectly on Firefox as a flex container */}
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={cardSpacing}
        sx={{
          pl: cardSpacing,
          my: { xs: 0.5, sm: 1, md: 2 },
        }}>
        {
          data.allBlogPost.nodes.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              subtitle={post.date}
              description={post.excerpt}
              link={post.slug}
              image={post.image && {
                data: post.image.childImageSharp.gatsbyImageData,
                alt: post.imageAlt
              }}
            />
          ))
        }
      </Masonry>
      <Footer />
    </>
  );
}

export const query = graphql`
  query IndexPageQuery($language: String!) {
    site {
      siteMetadata {
        description
        title
        author
        social {
          name
          url
        }
      }
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
    allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      nodes {
        id
        excerpt
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        imageAlt
      }
    }
  }
`
