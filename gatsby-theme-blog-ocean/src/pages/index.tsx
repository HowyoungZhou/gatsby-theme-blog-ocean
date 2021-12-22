import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ToolTip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
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

export default function ProminentAppBar() {
  const { getLink } = useI18n();

  return (
    <StyledAppBar position="static">
      <HeaderToolbar />
      <Box sx={{ marginInline: 4, marginBlock: 2 }}>
        <Typography variant="h3">
          <Trans>Hi! I'm Howyoung.</Trans>
        </Typography>
        <Typography variant="h5">
          <Trans>I'm a tech enthusiast learning computer science currently.</Trans>
        </Typography>
        <ToolTip title="GitHub">
          <IconButton
            size="large"
            color="inherit"
            to="https://github.com/HowyoungZhou"
            edge="start"
            // sx={{ marginLeft: -1 }}
            aria-label="github profile"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </ToolTip>
        <ToolTip title="E-Mail">
          <IconButton
            size="large"
            color="inherit"
            aria-label="email address"
            to="mailto:me@howyoung.dev"
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        </ToolTip>
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
