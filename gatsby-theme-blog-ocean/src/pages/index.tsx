import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { HeaderToolbar } from '../components/header';
import SocialIcons from "../components/social-icons";
import Masonry from '@mui/lab/Masonry';
import Card from "../components/card";
import { Post } from '../model/post';
import Seo from '../components/seo';
import Footer from '../components/footer';

const cardSpacing = { xs: 1, sm: 2, md: 3 };

const background = {
  light: 'linear-gradient(180deg, rgba(17, 112, 142, 1) 0%, rgba(24, 121, 151, 1) 6.35%, rgba(42, 145, 177, 1) 16.9%, rgba(70, 183, 217, 1) 29.99%, rgba(219, 238, 224, 1) 49.94%, rgba(25, 189, 188, 1) 65.77%, rgba(15, 141, 153, 1) 81.91%, rgba(10, 72, 85, 1) 100%);',
  dark: 'linear-gradient(180deg, rgba(5, 7, 34, 1) 0%, rgba(6, 13, 43, 1) 9.45%, rgba(10, 31, 69, 1) 25.12%, rgba(11, 37, 78, 1) 29.99%, rgba(33, 25, 73, 1) 49.48%, rgba(0, 37, 65, 1) 51.91%, rgba(1, 80, 128, 1) 76.51%, rgba(8, 92, 137, 1) 79.9%, rgba(155, 173, 176, 1) 100%);'
};

const StyledAppBar = styled(AppBar)<{ backgroundImage?: string }>(({ theme }) => ({
  color: '#fff',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'space-between',
  background: background[theme.palette.mode],
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
  const { t } = useTranslation();

  // Masonry behaves incorrectly on Firefox as a flex container
  return (
    <>
      <Seo title={t("Home")} />
      <StyledAppBar position="static" backgroundImage={''}>
        <HeaderToolbar />
        <Box sx={{ mx: 4, my: 2 }}>
          <Typography variant="h3">
            {t('greeting', "Hi! I'm {{ author }}.", { author: data.site.siteMetadata.author })}
          </Typography>
          <Typography variant="h5">
            {t('description', data.site.siteMetadata.description) /* i18next-extract-disable-line */}
          </Typography>
          <SocialIcons social={data.site.siteMetadata.social} />
        </Box>
      </StyledAppBar>

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
