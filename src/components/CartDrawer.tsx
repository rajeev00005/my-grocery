"use client";

import React, { useState } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    Divider,
    Card,
    CardContent,
} from "@mui/material";
import { Add, Remove, Delete, Undo } from "@mui/icons-material";
import { useCartStore } from "../store/useCartStore";
import { computeTotals } from "../utils/pricing";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
    const { items, setQty, removeItem, clearCart, undo, coupon, applyCoupon } =
        useCartStore();
    const totals = computeTotals(items, coupon);

    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleApply = () => {
        const ok = applyCoupon(code);
        if (!ok) {
            setError("Invalid or not applicable coupon");
        } else {
            setError("");
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box width={{ xs: 300, sm: 400 }} p={2} display="flex" flexDirection="column" height="100%">
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Your Cart
                </Typography>


                <Box flexGrow={1} overflow="auto">
                    {items.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            Cart is empty
                        </Typography>
                    ) : (
                        items.map((item) => (
                            <Card
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    transition: "transform 0.2s",
                                    "&:hover": { transform: "translateY(-2px)" },
                                }}
                            >
                                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography fontWeight="bold">{item.name}</Typography>
                                        <Typography color="text.secondary">₹{item.price * item.qty}</Typography>
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
                                        <IconButton onClick={() => removeItem(item.id)} size="small" color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>

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

                <Divider sx={{ mb: 2 }} />


                <Box mb={2}>
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


                <Box display="flex" flexDirection="column" gap={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "100%", ":hover": { transform: "scale(1.05)" } }}
                        onClick={() => {
                            onClose();
                            window.location.href = "/checkout";
                        }}
                    >
                        Go to Checkout
                    </Button>

                    <Box display="flex" justifyContent="space-between" gap={1}>
                        <Button
                            startIcon={<Undo />}
                            variant="outlined"
                            size="small"
                            sx={{ flex: 1, ":hover": { transform: "scale(1.05)" } }}
                            onClick={undo}
                        >
                            Undo
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ flex: 1, ":hover": { transform: "scale(1.05)" } }}
                            onClick={clearCart}
                        >
                            Clear
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Drawer>
    );
}
