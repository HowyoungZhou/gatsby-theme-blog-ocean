import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';


export default function PageLayout({ element, props }: { element: React.ReactNode, props: any }) {
  return (
    <React.StrictMode>
      <CssBaseline enableColorScheme />
      {element}
    </React.StrictMode>
  )
}
