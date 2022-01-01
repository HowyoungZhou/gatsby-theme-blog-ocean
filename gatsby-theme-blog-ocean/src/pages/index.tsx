import { SvgIconComponent } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ToolTip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import { IconButton } from 'gatsby-theme-material-ui';
import * as React from 'react';
import { HeaderToolbar } from '../components/header';
import useI18n from '../utils/use-i18n';

const StyledAppBar = styled(AppBar)(() => ({
  color: '#fff',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'space-between',
  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.8) 100%)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));

interface SiteMetadata {
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

const socialIconMap: Record<string, SvgIconComponent> = {
  'GitHub': GitHubIcon,
  'Email': EmailIcon,
  'Twitter': TwitterIcon,
  'WhatsApp': WhatsAppIcon,
  'Telegram': TelegramIcon
};

export default function Index({ data }: { data: SiteMetadata }) {
  const { getLink } = useI18n();

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
        {
          data.site.siteMetadata.social.map(
            ({ name, url }, i) => {
              const Icon = socialIconMap[name];
              return (
                <ToolTip title={name}>
                  <IconButton
                    size="large"
                    color="inherit"
                    to={url}
                    edge={i == 0 ? "start" : false}
                    aria-label={name}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                </ToolTip>
              );
            }
          )
        }
        <ToolTip title="About Me">
          <IconButton
            size="large"
            color="inherit"
            to={getLink("/about-me")}
            aria-label="about me"
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </ToolTip>
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
