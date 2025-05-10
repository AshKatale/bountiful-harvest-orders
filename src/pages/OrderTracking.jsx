
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Check, Clock, Package, Search, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ordersApi } from "@/lib/api";

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    Pending: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
    },
    "In Progress": {
      icon: Package,
      color: "bg-blue-100 text-blue-800",
    },
    Delivered: {
      icon: Check,
      color: "bg-green-100 text-green-800",
    },
  };

  const { icon: Icon, color } = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${color}`}>
      <Icon className="w-4 h-4 mr-1" />
      {status}
    </span>
  );
};

const OrderTracking = () => {
  const location = useLocation();
  const [searchOrderId, setSearchOrderId] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [searchByName, setSearchByName] = useState("");
  const [buyerName, setBuyerName] = useState(null);

  // Initialize from state if available
  useEffect(() => {
    if (location.state?.orderId) {
      setOrderId(location.state.orderId);
      setSearchOrderId(location.state.orderId);
    }
  }, [location.state]);

  // Query for a specific order
  const orderQuery = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => ordersApi.getById(orderId || ""),
    enabled: !!orderId,
  });

  // Query for orders by buyer name
  const buyerOrdersQuery = useQuery({
    queryKey: ["buyerOrders", buyerName],
    queryFn: () => ordersApi.getAll(buyerName || ""),
    enabled: !!buyerName,
  });

  const handleOrderSearch = (e) => {
    e.preventDefault();
    if (searchOrderId.trim()) {
      setOrderId(searchOrderId.trim());
      setBuyerName(null); // Reset buyer search
    }
  };

  const handleBuyerSearch = (e) => {
    e.preventDefault();
    if (searchByName.trim()) {
      setBuyerName(searchByName.trim());
      setOrderId(null); // Reset order search
    }
  };

  // Status step indicator
  const OrderStatusTracker = ({ status }) => {
    const steps = ["Pending", "In Progress", "Delivered"];
    const currentStep = steps.indexOf(status);
    
    return (
      <div className="mt-6">
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, i) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  i <= currentStep ? "text-green-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    i <= currentStep
                      ? "border-green-600 bg-green-100"
                      : "border-gray-300"
                  }`}
                >
                  {i === 0 && <Clock className="w-4 h-4" />}
                  {i === 1 && <Package className="w-4 h-4" />}
                  {i === 2 && <Check className="w-4 h-4" />}
                </div>
                <span className="text-xs mt-1">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order ID Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Track by Order ID</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOrderSearch} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your order ID"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  className="px-3 py-2"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Buyer Name Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Find by Buyer Name</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBuyerSearch} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter buyer name"
                  value={searchByName}
                  onChange={(e) => setSearchByName(e.target.value)}
                  className="px-3 py-2"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Find
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Single Order Details */}
      {orderQuery.isLoading && orderId && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {orderQuery.isError && orderId && (
        <Card className="border-red-200">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-red-600">Order Not Found</h2>
            <p className="text-gray-600 mt-2">
              We couldn't find an order with ID: {orderId}
            </p>
          </CardContent>
        </Card>
      )}

      {orderQuery.data && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                Order #{orderQuery.data.id.substring(0, 8)}
              </CardTitle>
              <OrderStatusBadge status={orderQuery.data.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <OrderStatusTracker status={orderQuery.data.status} />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-500">Order Details</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Product:</span>{" "}
                    {orderQuery.data.product?.name || `Product #${orderQuery.data.productId}`}
                  </p>
                  <p>
                    <span className="font-medium">Quantity:</span>{" "}
                    {orderQuery.data.quantity} units
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(orderQuery.data.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500">Delivery Information</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {orderQuery.data.buyerName}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span>{" "}
                    {orderQuery.data.contact}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {orderQuery.data.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Buyer Orders List */}
      {buyerOrdersQuery.isLoading && buyerName && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      )}

      {buyerOrdersQuery.data && buyerOrdersQuery.data.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders for {buyerName}</h2>
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buyerOrdersQuery.data.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>
                        {order.product?.name || `Product #${order.productId}`}
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setOrderId(order.id);
                            setSearchOrderId(order.id);
                            setBuyerName(null);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {buyerOrdersQuery.data && buyerOrdersQuery.data.length === 0 && (
        <Card className="border-amber-200">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-amber-600">No Orders Found</h2>
            <p className="text-gray-600 mt-2">
              No orders found for buyer: {buyerName}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderTracking;
