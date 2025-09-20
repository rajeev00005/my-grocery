"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCartStore } from "../../store/useCartStore";
import { useOrderStore } from "../../store/useOrderStore";
import { computeTotals } from "../../utils/pricing";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, setQty, removeItem, clearCart, coupon, applyCoupon } =
    useCartStore();
  const { addOrder } = useOrderStore();
  const totals = computeTotals(items, coupon);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const ok = applyCoupon(code);
    if (!ok) setError("Invalid or not applicable coupon");
    else setError("");
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    addOrder({ items, totals, coupon });
    clearCart();
    router.push("/orders");
  };

  return (
    <Box p={3} maxWidth="700px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {items.length === 0 ? (
        <Typography>No items in the cart.</Typography>
      ) : (
        <>
         
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography color="text.secondary">
                    ₹{item.price * item.qty}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    onClick={() => setQty(item.id, item.qty - 1)}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <Typography>{item.qty}</Typography>
                  <IconButton
                    onClick={() => setQty(item.id, item.qty + 1)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    onClick={() => removeItem(item.id)}
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />

         
          <Box display="flex" gap={1} mb={2}>
            <TextField
              label="Coupon"
              size="small"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                ":hover": { bgcolor: "#115293", transform: "scale(1.05)" },
              }}
              onClick={handleApply}
            >
              Apply
            </Button>
          </Box>
          {error && (
            <Typography variant="caption" color="error" mb={1}>
              {error}
            </Typography>
          )}

         
          <Box mb={3}>
            <Typography>Subtotal: ₹{totals.subtotal}</Typography>
            {totals.tierDiscount > 0 && (
              <Typography>
                Discount ({totals.tierPercent}%): -₹{totals.tierDiscount}
              </Typography>
            )}
            {totals.couponDiscount > 0 && (
              <Typography>Coupon: -₹{totals.couponDiscount}</Typography>
            )}
            <Typography variant="h6">Total: ₹{totals.total}</Typography>
          </Box>

          
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              sx={{
                flex: 1,
                ":hover": { transform: "scale(1.05)" },
              }}
              onClick={handleCheckout}
            >
              Place Order
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              sx={{
                flex: 1,
                ":hover": { transform: "scale(1.05)" },
              }}
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
