"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useOrderStore } from "../../store/useOrderStore";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { orders, clearOrders } = useOrderStore();
  const router = useRouter();

  return (
    <Box p={3} maxWidth="700px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders placed yet.</Typography>
      ) : (
        <>
          {orders.map((order) => (
            <Box
              key={order.id}
              mb={3}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Order ID: {order.id} |{" "}
                {new Date(order.timestamp).toLocaleString()}
              </Typography>
              <List>
                {order.items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`${item.name} x${item.qty}`}
                      secondary={`₹${item.price * item.qty}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography>Subtotal: ₹{order.subtotal}</Typography>
              {order.tierDiscount > 0 && (
                <Typography>Discount: -₹{order.tierDiscount}</Typography>
              )}
              {order.couponDiscount > 0 && (
                <Typography>Coupon: -₹{order.couponDiscount}</Typography>
              )}
              <Typography variant="h6">Total: ₹{order.total}</Typography>
            </Box>
          ))}

          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <Button variant="outlined" color="error" onClick={clearOrders}>
              Clear All Orders
            </Button>

            <Button
              variant="contained"
              color="primary"
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
