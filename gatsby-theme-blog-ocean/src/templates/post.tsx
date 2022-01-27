import { MDXProvider } from "@mdx-js/react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "gatsby-material-ui-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import AppBar from "../components/header";
import components from "./components";

interface TocNode {
  title?: string;
  url?: string;
  items?: TocNode[];
}

interface TocItem extends TocNode {
  depth: number;
}

const drawerWidth = '250px';

const Main = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth})`,
    marginLeft: `${drawerWidth}`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function* traverseToc(root: TocNode) {
  let stack = [{ depth: 0, ...root }];
  let cur: TocItem;
  while (cur = stack.pop()) {
    yield cur;
    if (cur.items) stack.push(...cur.items.map(v => ({ depth: cur.depth + 1, ...v })));
  }
}

function TocTreeView({ toc, selected, sx }: { toc: TocNode, selected?: TocNode, sx?: SxProps<Theme> }) {
  return (
    <Stack sx={sx}>
      {
        Array.from(traverseToc(toc)).slice(1).map(
          item => (
            <Link
              key={item.url}
              to={item.url}
              color={item.url === selected?.url ? "text.primary" : "text.secondary"}
              underline="hover"
              sx={{ pl: item.depth }}
            >
              {item.title}
            </Link>
          )
        )
      }
    </Stack>
  );
}

export default function Post({ data }) {
  const theme = useTheme();
  const post = data.blogPost;
  const onPhone = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { setOpen(!onPhone) }, [onPhone])

  return (
    <>
      {/* <Seo title={post.title} /> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={onPhone ? "temporary" : "persistent"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography sx={{ flexGrow: 1, ml: 1 }} variant="subtitle1" color="text.secondary">
            <Trans>Contents</Trans>
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <TocTreeView toc={data.blogPost.tableOfContents} sx={{ mx: 1, my: 2 }} />
      </Drawer>
      <Main open={!onPhone && open}>
        <AppBar
          title={post.title}
          leading={!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              size="large"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        />
        <main>
          <Container>
            <Box sx={{ my: 3 }}>
              {
                post.image && (
                  <GatsbyImage
                    objectFit="cover"
                    style={{ width: '100%', height: '100%' }}
                    image={post.image.childImageSharp.gatsbyImageData}
                    alt={post.imageAlt}
                  />
                )
              }
            </Box>
            <MDXProvider components={components}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </Container>

        </main>
      </Main>
      {/* <Footer /> */}
    </>
  );
}
