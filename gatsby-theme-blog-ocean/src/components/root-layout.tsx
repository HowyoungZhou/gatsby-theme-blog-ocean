import * as React from 'react';
import { ThemeProvider } from "./theme-context";

export default function RootLayout({ element, props }: { element: React.ReactNode, props: any }) {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  )
}
