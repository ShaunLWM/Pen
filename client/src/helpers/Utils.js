import { theme } from "../helpers/Theme";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createTheme(type) {
  return {
    ...theme,
    palette: {
      ...theme.palette,
      type,
    },
  };
}
