
import { toast } from "sonner";

// Base API URL
const API_URL = "/api";

// API Error handling
const handleApiError = (error) => {
  console.error("API Error:", error);
  let message = "Something went wrong. Please try again.";
  
  if (error instanceof Error) {
    message = error.message;
  }
  
  toast.error(message);
  
  throw error;
};

// Products API
export const productsApi = {
  // Get all products
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get a single product by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create a new product
  create: async (product) => {
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
  update: async (id, product) => {
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
  delete: async (id) => {
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
  getAll: async (buyerName) => {
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
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`);
      if (!response.ok) throw new Error("Failed to fetch order");
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create a new order
  create: async (order) => {
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
  updateStatus: async (id, status) => {
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
