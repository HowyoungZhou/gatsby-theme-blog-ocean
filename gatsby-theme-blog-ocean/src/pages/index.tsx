import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { HeaderToolbar } from '../components/header';
import SocialIcons from "../components/social-icons";
import Masonry from '@mui/lab/Masonry';
import Card from "../components/card";
import { Post } from '../model/post';

const StyledAppBar = styled(AppBar)(() => ({
  color: '#fff',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.8) 100%)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));

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

  return (
    <>
      <StyledAppBar position="static">
        <HeaderToolbar />
        <Box sx={{ mx: 4, my: 2 }}>
          <Typography variant="h3">
            <Trans>Hi! I'm {data.site.siteMetadata.author}.</Trans>
          </Typography>
          <Typography variant="h5">
            <Trans>I'm a tech enthusiast learning computer science currently.</Trans>
          </Typography>
          <SocialIcons social={data.site.siteMetadata.social} />
        </Box>
      </StyledAppBar>

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingLeft: { xs: 1, sm: 2, md: 3 }, paddingTop: { xs: 1, sm: 2, md: 3 } }}>
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
