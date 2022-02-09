import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as React from 'react';
import { HeaderToolbar } from '../components/header';

const StyledAppBar = styled(AppBar)<{ background?: string }>(({ background }) => ({
  color: '#fff',
  minHeight: '45vh',
  display: 'flex',
  justifyContent: 'space-between',
  background: background
}));

export interface BannerProps {
  children: React.ReactNode
}

export default function ({ children }: BannerProps) {
  const { t } = useTranslation();

  return (
    <StyledAppBar position="static">
      <HeaderToolbar />
      <Box sx={{ mx: 4, my: 2 }}>
        {children}
      </Box>
    </StyledAppBar>
  );
}
