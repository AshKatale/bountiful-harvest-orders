
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product, productsApi, ordersApi } from "@/lib/api";

// Form validation schema
const orderSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  quantity: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num > 0;
  }, "Quantity must be a positive number"),
  buyerName: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().min(5, "Contact must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get products for dropdown
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  // Set up form with default values
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: "",
      quantity: "1",
      buyerName: "",
      contact: "",
      address: "",
    },
  });

  // If navigated from products page with a product
  useEffect(() => {
    const productFromState = location.state?.product;
    if (productFromState) {
      form.setValue("productId", String(productFromState.id));
      setSelectedProduct(productFromState);
    }
  }, [location.state, form]);

  // Update selected product when selection changes
  const handleProductChange = (value: string) => {
    const product = products.find((p) => p.id === parseInt(value, 10));
    setSelectedProduct(product || null);
  };

  // Calculate total price
  const calculateTotal = () => {
    const quantity = parseInt(form.watch("quantity"), 10) || 0;
    return selectedProduct ? (selectedProduct.pricePerUnit * quantity).toFixed(2) : "0.00";
  };

  // Form submission handler
  const onSubmit = async (values: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      const orderData = {
        productId: parseInt(values.productId, 10),
        quantity: parseInt(values.quantity, 10),
        buyerName: values.buyerName,
        contact: values.contact,
        address: values.address,
      };

      const response = await ordersApi.create(orderData);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ID is: ${response.id}`,
      });
      
      navigate(`/order/tracking`, { state: { orderId: response.id } });
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Place an Order</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Product</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleProductChange(value);
                  }}
                  value={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={String(product.id)}>
                        {product.name} - ${product.pricePerUnit.toFixed(2)} per unit
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Force recalculation of total
                      form.trigger("quantity");
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Number of units you want to order
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedProduct && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price per unit:</span>
                <span className="font-semibold">${selectedProduct.pricePerUnit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{form.watch("quantity") || 0}</span>
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold text-agro">${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>

            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number or email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your complete address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Place Order"}
            {!isSubmitting && <ShoppingCart className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderForm;
