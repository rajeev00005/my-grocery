"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../store/useSnackbarStore";

export default function GlobalSnackbar() {
  const { open, message, hide } = useSnackbarStore();
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={hide} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={hide} severity="success" variant="filled">{message}</Alert>
    </Snackbar>
  );
}
