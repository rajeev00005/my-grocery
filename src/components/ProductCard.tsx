"use client";

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useCartStore } from "../store/useCartStore";

type Props = { product: { id: number; name: string; price: number; category: string } };

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card >
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 250, width: 250 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">₹{product.price}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 10}}
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
