"use client";

import { createTheme } from "@mui/material/styles";
import { M_PLUS_Rounded_1c } from "next/font/google";

const M_PLUS_Rounded_1cFont = M_PLUS_Rounded_1c({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#6dc965",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f8f8f8e5",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: M_PLUS_Rounded_1cFont.style.fontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: { fontSize: 60 },
    h2: { fontSize: 48 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
    subtitle1: { fontSize: 18 },
    subtitle2: { fontSize: 18 },
    body1: { fontSize: 16 },
    body2: { fontSize: 16 },
    button: { textTransform: "none" },
  },
});

export default theme;
