
import { toast } from "@/components/ui/use-toast";

// Type definitions
export interface Product {
  id: number;
  name: string;
  pricePerUnit: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  productId: number;
  product?: Product;
  quantity: number;
  buyerName: string;
  contact: string;
  address: string;
  status: "Pending" | "In Progress" | "Delivered";
  createdAt: string;
}

// Base API URL
const API_URL = "/api";

// API Error handling
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  let message = "Something went wrong. Please try again.";
  
  if (error instanceof Error) {
    message = error.message;
  }
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  
  throw error;
};

// Products API
export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get a single product by ID
  getById: async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create a new product
  create: async (product: Omit<Product, "id">): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to create product");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update an existing product
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to update product");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete a product
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
    } catch (error) {
      return handleApiError(error);
    }
  },
};

// Orders API
export const ordersApi = {
  // Get all orders
  getAll: async (buyerName?: string): Promise<Order[]> => {
    try {
      const url = buyerName
        ? `${API_URL}/orders?buyer=${encodeURIComponent(buyerName)}`
        : `${API_URL}/orders`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get a single order by ID
  getById: async (id: string): Promise<Order> => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`);
      if (!response.ok) throw new Error("Failed to fetch order");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create a new order
  create: async (order: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error("Failed to create order");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update an order's status
  updateStatus: async (id: string, status: Order["status"]): Promise<Order> => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
};
