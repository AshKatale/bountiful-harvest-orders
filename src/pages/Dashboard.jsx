
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agro to-agro-light rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fresh Farm Produce in Bulk
          </h1>
          <p className="text-xl mb-8">
            Quality fruits and vegetables direct from farms to your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="bg-white text-agro hover:bg-gray-100"
            >
              Browse Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/order")}
              className="border-white text-white hover:bg-white hover:text-agro"
            >
              Place an Order
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-agro-light/20 p-4 rounded-full mb-4">
                <ShoppingCart className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-2">Browse & Order</h3>
              <p className="text-gray-600">
                Explore our fresh produce catalog and place bulk orders easily
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-agro-light/20 p-4 rounded-full mb-4">
                <Package className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-2">We Pack & Ship</h3>
              <p className="text-gray-600">
                We carefully package your order and deliver it to your location
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-agro-light/20 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-agro" />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Order</h3>
              <p className="text-gray-600">
                Follow your order status from processing to delivery
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Place your first bulk order today and experience fresh farm produce
          delivered to your doorstep
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/products")}
          className="bg-agro hover:bg-agro-dark"
        >
          View Products
        </Button>
      </section>
    </div>
  );
};

export default Dashboard;
