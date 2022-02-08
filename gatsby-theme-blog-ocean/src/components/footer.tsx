import React from 'react';
import Typography from '@mui/material/Typography';
import { InlineIcon } from '@iconify/react';
import MaterialUi from '@iconify-icons/logos/material-ui';
import GatsbyIcon from '@iconify-icons/logos/gatsby';
import redHeart from '@iconify-icons/emojione/red-heart';
import { Trans } from 'gatsby-plugin-react-i18next';
import { Link } from 'gatsby-theme-material-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { Paper } from '@mui/material';


export default function Footer() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )
  const author = site.siteMetadata.author;

  return (
    <Paper component="footer" sx={{ p: 3, flexGrow: 0 }}>
      <Typography align="center" color="text.secondary">
        <Trans>
          Built with <InlineIcon icon={redHeart} /> by {{ author }}.
        </Trans>
        <Typography variant="body2" component="span">
          <Trans>
            The theme is designed by <Link to="https://www.howyoung.dev">Howyoung</Link> and powered by <InlineIcon icon={GatsbyIcon} /> Gatsby and <InlineIcon icon={MaterialUi} /> Material UI.
          </Trans>
        </Typography>
      </Typography>
    </Paper>
  );
}
