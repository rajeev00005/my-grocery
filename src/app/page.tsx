"use client";

import React, { useState } from "react";
import { Box, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import ProductGrid from "../components/ProductGrid";

type Product = { id: number; name: string; price: number; category: string };

const PRODUCTS: Product[] = [
  { id: 1, name: "Apple", price: 50, category: "Fruit" },
  { id: 2, name: "Banana", price: 20, category: "Fruit" },
  { id: 3, name: "Milk", price: 40, category: "Dairy" },
  { id: 4, name: "Cheese", price: 80, category: "Dairy" },
  { id: 5, name: "Bread", price: 30, category: "Bakery" },
  { id: 6, name: "Butter", price: 60, category: "Dairy" },
  { id: 7, name: "Orange", price: 35, category: "Fruit" },
  { id: 8, name: "Cake", price: 120, category: "Bakery" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" ? true : p.category === category)
  ).sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <Box p={3}>
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Fruit">Fruit</MenuItem>
            <MenuItem value="Dairy">Dairy</MenuItem>
            <MenuItem value="Bakery">Bakery</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            value={sort}
            label="Sort by Price"
            onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          >
            <MenuItem value="asc">Low → High</MenuItem>
            <MenuItem value="desc">High → Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ProductGrid products={filtered} />
    </Box>
  );
}
