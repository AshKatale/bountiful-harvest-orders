
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Truck, Leaf, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section - Updated with modern design */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 rounded-xl opacity-90"></div>
        <div className="relative rounded-xl overflow-hidden">
          <div className="bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e')] bg-cover bg-center h-[600px]">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="container mx-auto px-6 relative z-10 flex items-center h-full">
              <div className="max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Farm Fresh Produce, Straight to Your Door
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100">
                  Premium quality, sustainably grown fruits and vegetables for your business
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/products")}
                    className="bg-agro hover:bg-agro-dark text-white px-8 py-3 text-lg"
                  >
                    Browse Products
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/order")}
                    className="border-2 border-white text-white hover:bg-white hover:text-agro-dark px-8 py-3 text-lg"
                  >
                    Place an Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Agrokart?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="bg-agro-light/20 p-5 rounded-full mb-6">
                  <Leaf className="h-10 w-10 text-agro" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Farm Fresh</h3>
                <p className="text-gray-600">
                  Our produce is harvested at peak freshness and delivered within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="bg-agro-light/20 p-5 rounded-full mb-6">
                  <Truck className="h-10 w-10 text-agro" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Direct Delivery</h3>
                <p className="text-gray-600">
                  Farm to business delivery with no middlemen, ensuring the best prices
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="bg-agro-light/20 p-5 rounded-full mb-6">
                  <ShoppingCart className="h-10 w-10 text-agro" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Bulk Ordering</h3>
                <p className="text-gray-600">
                  Simple bulk ordering process designed specifically for businesses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 text-2xl font-bold text-agro">1</div>
              <h3 className="text-xl font-bold mb-3">Browse</h3>
              <p className="text-gray-600">
                Explore our catalog of fresh, seasonal produce
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 text-2xl font-bold text-agro">2</div>
              <h3 className="text-xl font-bold mb-3">Order</h3>
              <p className="text-gray-600">
                Add items to cart and place your bulk order
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 text-2xl font-bold text-agro">3</div>
              <h3 className="text-xl font-bold mb-3">Deliver</h3>
              <p className="text-gray-600">
                We pack and deliver your order on the scheduled date
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 text-2xl font-bold text-agro">4</div>
              <h3 className="text-xl font-bold mb-3">Enjoy</h3>
              <p className="text-gray-600">
                Receive farm-fresh produce at your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Features that make us different</h2>
              <p className="text-xl text-gray-600 mb-8">
                Agrokart is designed with businesses in mind, offering everything you need for efficient produce ordering.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-agro/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-5 w-5 text-agro" />
                  </div>
                  <span className="text-lg">Simple bulk ordering process</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-agro/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-5 w-5 text-agro" />
                  </div>
                  <span className="text-lg">Direct farmer partnerships</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-agro/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-5 w-5 text-agro" />
                  </div>
                  <span className="text-lg">Scheduled weekly deliveries</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-agro/10 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-5 w-5 text-agro" />
                  </div>
                  <span className="text-lg">Real-time order tracking</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1518843875459-f738682238a6"
                alt="Fresh produce"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-xl font-bold text-agro">100% Organic</p>
                <p className="text-gray-600">Certified sustainable farming</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-agro to-agro-light rounded-xl text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust Agrokart for their fresh produce needs
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/products")}
            className="bg-white text-agro hover:bg-gray-100 text-lg px-8 py-3"
          >
            Browse Our Catalog
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
