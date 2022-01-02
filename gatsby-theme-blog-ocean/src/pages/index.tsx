import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { HeaderToolbar } from '../components/header';
import SocialIcons from "../components/social-icons";

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
};

export default function Index({ data }: { data: Data }) {

  return (
    <StyledAppBar position="static">
      <HeaderToolbar />
      <Box sx={{ marginInline: 4, marginBlock: 2 }}>
        <Typography variant="h3">
          <Trans>Hi! I'm {data.site.siteMetadata.author}.</Trans>
        </Typography>
        <Typography variant="h5">
          <Trans>I'm a tech enthusiast learning computer science currently.</Trans>
        </Typography>
        <SocialIcons social={data.site.siteMetadata.social} />
      </Box>

    </StyledAppBar>
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
  }
`
