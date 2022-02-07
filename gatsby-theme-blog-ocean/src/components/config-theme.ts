import { PaletteMode, ThemeOptions } from "@mui/material";
import blue from "@mui/material/colors/blue";

export default function configTheme(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      primary: {
        main: mode === 'light' ? blue[600] : blue[300]
      },
    }
  }
}
