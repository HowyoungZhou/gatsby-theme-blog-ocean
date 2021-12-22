import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import TranslateIcon from '@mui/icons-material/Translate';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import ToolTip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Button, IconButton, Link } from 'gatsby-theme-material-ui';
import React from 'react';
import useI18n from '../utils/use-i18n';
import { ThemeMode, useMode } from './theme-context';

const modeMap: Record<ThemeMode, { name: string; icon: React.ReactNode }> = {
  light: {
    name: 'Light',
    icon: <BrightnessHighIcon fontSize="small" />,
  },
  dark: {
    name: 'Dark',
    icon: <Brightness4Icon fontSize="small" />,
  },
  auto: {
    name: 'System Default',
    icon: <BrightnessAutoIcon fontSize="small" />,
  }
};

const languageMap = {
  'en': 'English',
  'zh': '中文',
  'jp': '日本語'
};

function ThemeIconButton() {
  const [mode, setMode] = useMode();
  const { t } = useTranslation();

  const currentMode = modeMap[mode];

  const toggleMode = () => {
    const nextModes: Record<ThemeMode, ThemeMode> = { light: 'dark', dark: 'auto', auto: 'light' };
    setMode(nextModes[mode]);
  };

  return <ToolTip title={t(currentMode.name)}>
    <IconButton
      aria-label="toggle theme"
      color="inherit"
      onClick={toggleMode}
    >
      {currentMode.icon}
    </IconButton>
  </ToolTip >
}

function LanguageIconButton() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<Element>(null);
  const { languages, originalPath, getLink } = useI18n();

  return (
    <>
      <ToolTip title={t("Language")}>
        <IconButton
          aria-label="switch languages"
          color="inherit"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <TranslateIcon fontSize="small" />
        </IconButton>
      </ToolTip>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {
          languages.map(
            lng => (
              <Link
                key={lng}
                to={getLink(originalPath, lng)}
                color="inherit"
                underline="none"
              >
                <MenuItem dense >{languageMap[lng]}</MenuItem>
              </Link>
            )
          )
        }
      </Menu>
    </>
  );
}

function ButtonGroup() {
  const { t } = useTranslation();
  const { getLink } = useI18n();

  return (
    <>
      <Button
        sx={{ marginRight: 1 }}
        color="inherit"
        startIcon={<HomeIcon />}
        to={getLink("/")}
      >
        <Trans>Home</Trans>
      </Button>
      <Button
        sx={{ marginRight: 1 }}
        color="inherit"
        startIcon={<LibraryBooksIcon />}
        to={getLink("/posts")}
      >
        <Trans>Posts</Trans>
      </Button>
      <LanguageIconButton />
      <ThemeIconButton />
      <ToolTip title={t("RSS Feed")}>
        <IconButton
          edge="end"
          aria-label="rss feed"
          color="inherit"
          to={''}
        >
          <RssFeedIcon fontSize="small" />
        </IconButton>
      </ToolTip>

    </>
  );
}

function MobileButtonGroup() {
  const { t } = useTranslation();
  const { getLink } = useI18n();

  return (
    <>
      <ToolTip title={t("Home")}>
        <IconButton
          aria-label="home"
          size="large"
          color="inherit"
          to={getLink("/")}
        >
          <HomeIcon fontSize="small" />
        </IconButton>
      </ToolTip>
      <ToolTip title={t("Posts")}>
        <IconButton
          aria-label="posts"
          size="large"
          color="inherit"
          to={getLink("/posts")}
        >
          <LibraryBooksIcon fontSize="small" />
        </IconButton>
      </ToolTip>
      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<Element>(null);
  const { t } = useTranslation();
  const { language, languages, originalPath, getLink } = useI18n();
  const [mode, setMode] = useMode();

  return (
    <>
      <ToolTip title={t("Menu")}>
        <IconButton
          edge="end"
          size="large"
          aria-label="posts"
          color="inherit"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ToolTip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <ListSubheader>
          <Trans>Language</Trans>
        </ListSubheader>
        {
          languages.map(
            lng => (
              <Link key={lng} to={getLink(originalPath, lng)} color="inherit" underline="none">
                <MenuItem selected={lng === language}>
                  {languageMap[lng]}
                </MenuItem>
              </Link>
            )
          )
        }

        <ListSubheader>
          <Trans>Theme</Trans>
        </ListSubheader>
        {
          Object.entries(modeMap).map(
            ([k, v]) => (
              <MenuItem key={k} selected={k === mode} onClick={() => setMode(k as ThemeMode)}>
                {v.name}
              </MenuItem>
            )
          )
        }
        <Divider />

        <Link to={''} color="inherit" underline="none">
          <MenuItem>
            <Trans>RSS Feed</Trans>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}

export declare interface HeaderToolbarProps { leading?: React.ReactNode, title?: string };

export function HeaderToolbar({ leading, title }: HeaderToolbarProps) {
  return (
    <Toolbar>
      {leading || null}
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ButtonGroup />
      </Box>
      <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
        <MobileButtonGroup />
      </Box>
    </Toolbar>
  );
}

export declare interface HeaderAppBarProps extends HeaderToolbarProps, AppBarProps { };

export default function HeaderAppBar(props: HeaderAppBarProps) {
  const { leading, title, ...appBarProps } = props;
  return (
    <AppBar position="sticky" {...appBarProps}>
      <HeaderToolbar {...{ leading, title }} />
    </AppBar >
  );
}
