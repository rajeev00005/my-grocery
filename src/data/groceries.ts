export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Fruits" | "Vegetables" | "Dairy" | "Bakery" | "Pantry";
};

export const GROCERIES: Product[] = [
  { id: "p1", name: "Apple (1kg)", price: 80, category: "Fruits" },
  { id: "p2", name: "Banana (1 dozen)", price: 40, category: "Fruits" },
  { id: "p3", name: "Milk (1L)", price: 60, category: "Dairy" },
  { id: "p4", name: "Bread (Loaf)", price: 35, category: "Bakery" },
  { id: "p5", name: "Rice (5kg)", price: 420, category: "Pantry" },
];
