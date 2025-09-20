"use client";

import React from "react";
import { Box, Typography, Container, Link, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >

          <Typography variant="h6" fontWeight="bold" letterSpacing={1}>
            GroceryHub
          </Typography>

           
          <Stack direction="row" spacing={1}>
            <IconButton
              href="#"
              sx={{
                color: "#fff",
                "&:hover": { color: "#1976d2" },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: "#fff",
                "&:hover": { color: "#1976d2" },
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: "#fff",
                "&:hover": { color: "#1976d2" },
              }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Stack>

         
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          mt={3}
          color="white.500"
        >
          &copy; {new Date().getFullYear()} GroceryHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
