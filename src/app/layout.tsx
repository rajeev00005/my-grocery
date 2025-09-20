"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalSnackbar from "../components/GlobalSnackbar";
import "../../src/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Box component="main" sx={{ minHeight: "calc(100vh - 200px)", p: 2 }}>
            {children}
          </Box>
          <Footer />
          <GlobalSnackbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
