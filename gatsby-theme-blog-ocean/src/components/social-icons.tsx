import { SvgIconComponent } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ToolTip from '@mui/material/Tooltip';
import { IconButton } from 'gatsby-theme-material-ui';
import * as React from 'react';
import useI18n from '../utils/use-i18n';

interface Social {
  name: string;
  url: string
};

const socialIconMap: Record<string, SvgIconComponent> = {
  'GitHub': GitHubIcon,
  'Email': EmailIcon,
  'Twitter': TwitterIcon,
  'WhatsApp': WhatsAppIcon,
  'Telegram': TelegramIcon
};

export default function SocialIcons({ social }: { social: Social[] }) {
  const { getLink } = useI18n();

  return (
    <>
      {
        social.map(
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
      </ToolTip >
    </>
  );
}
