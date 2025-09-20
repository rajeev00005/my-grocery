"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "./CartDrawer";
import { useCartStore } from "../store/useCartStore";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          bgcolor: "primary.main",
          color: "#ffffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
             
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                cursor: "pointer",
              }}
              onClick={() => window.location.href = "/"}
            >
              GroceryHub
            </Typography>
             
            <IconButton
              color="primary"
              onClick={() => setOpen(true)}
              sx={{
                bgcolor: "#f1f3f4",
                "&:hover": { bgcolor: "#e0e0e0", transform: "scale(1.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

       
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
