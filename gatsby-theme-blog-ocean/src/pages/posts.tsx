import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { graphql } from "gatsby";
import Card from '../components/card';
import AppBar from '../components/header';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Post } from '../model/post';
import Seo from '../components/seo';
import Footer from '../components/footer';

interface Data {
  allBlogPost: {
    nodes: Post[];
  }
};

function PostsTimeline({ posts }: { posts: Post[] }) {
  return (
    <Timeline>
      {
        posts.map(
          post => (
            <TimelineItem key={post.id}>
              <TimelineOppositeContent sx={{ flexGrow: 0, minWidth: 100 }}>
                <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card
                  link={post.slug}
                  title={post.title}
                  image={
                    post.image && {
                      alt: post.imageAlt,
                      data: post.image.childImageSharp.gatsbyImageData
                    }
                  }
                  description={post.excerpt}
                />
              </TimelineContent>
            </TimelineItem>
          )
        )
      }
      <TimelineItem>
        <TimelineOppositeContent sx={{ flexGrow: 0, minWidth: 100 }} />
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="body2" color="text.secondary" component="p">
            <Trans>No more posts at now.</Trans>
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function PostsList({ posts }: { posts: Post[] }) {
  return (
    <Stack spacing={1} sx={{ margin: 1 }}>
      {
        posts.map(
          post => (
            <Card
              link={post.slug}
              title={post.title}
              subtitle={post.date}
              image={
                post.image && {
                  // caption: post.imageCaptionText,
                  alt: post.imageAlt,
                  data: post.image.childImageSharp.gatsbyImageData
                }
              }
              description={post.excerpt}
            />
          )
        )
      }
    </Stack>
  );
}

export default function Posts({ data }: { data: Data }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
      <Seo title={t("Posts")} />
      <AppBar title={t("Posts")} />

      <Container sx={{ display: { xs: 'none', sm: 'block' }, flex: 1 }}>
        <PostsTimeline posts={data.allBlogPost.nodes} />
      </Container>

      <Box sx={{ display: { sm: 'none', xs: 'block' }, flex: 1 }}>
        <PostsList posts={data.allBlogPost.nodes} />
      </Box>
      <Footer />
    </Box>
  );
}

export const query = graphql`
  query PostsQuery($language: String!) {
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
        imageCaptionText
        imageCaptionLink
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
