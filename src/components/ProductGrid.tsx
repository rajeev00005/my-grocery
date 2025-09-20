"use client";

import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
