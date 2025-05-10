
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Package, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "../contexts/CartContext";

// Mock API for demo purposes
const productsApi = {
  getAll: async () => {
    return [
      { id: 1, name: "Fresh Apples", pricePerUnit: 2.99, unit: "kg", stock: 120 },
      { id: 2, name: "Organic Bananas", pricePerUnit: 1.99, unit: "bunch", stock: 80 },
      { id: 3, name: "Ripe Tomatoes", pricePerUnit: 3.49, unit: "kg", stock: 200 },
      { id: 4, name: "Green Lettuce", pricePerUnit: 1.79, unit: "head", stock: 150 },
      { id: 5, name: "Sweet Oranges", pricePerUnit: 4.99, unit: "kg", stock: 100 },
      { id: 6, name: "Fresh Grapes", pricePerUnit: 5.99, unit: "kg", stock: 75 },
      { id: 7, name: "Russet Potatoes", pricePerUnit: 2.49, unit: "kg", stock: 300 },
      { id: 8, name: "Red Onions", pricePerUnit: 1.99, unit: "kg", stock: 250 },
    ];
  }
};

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock product images for demo
  const getProductImage = (productName) => {
    const defaultImage = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9";
    const fruitImages = {
      apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
      orange: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9",
      banana: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7",
      grape: "https://images.unsplash.com/photo-1596363505729-4190a9506133",
      mango: "https://images.unsplash.com/photo-1553279768-865429fa0078",
      tomato: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
      potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      onion: "https://images.unsplash.com/photo-1620574387735-3624d75b5fcc",
    };

    for (const [key, url] of Object.entries(fruitImages)) {
      if (productName.toLowerCase().includes(key)) {
        return url;
      }
    }

    return defaultImage;
  };

  const handleOrderClick = (product) => {
    navigate("/order", { state: { product } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Failed to load products</h2>
          <p className="text-gray-500 mt-2">Please try again later</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or browse our catalog
          </p>
          {searchTerm && (
            <Button 
              onClick={() => setSearchTerm("")} 
              variant="outline" 
              className="mt-4"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="aspect-square relative">
                <img
                  src={product.imageUrl || getProductImage(product.name)}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-agro font-semibold">
                  ${product.pricePerUnit.toFixed(2)} per {product.unit}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  className="flex-1"
                  variant="outline"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={() => handleOrderClick(product)}
                >
                  Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
