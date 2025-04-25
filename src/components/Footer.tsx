
import { Package } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <Package className="h-6 w-6 text-agro mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Agrokart</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Fresh produce delivered in bulk to your doorstep.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-gray-800 font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="/" className="hover:text-agro">Home</a></li>
              <li className="mb-2"><a href="/products" className="hover:text-agro">Products</a></li>
              <li className="mb-2"><a href="/order" className="hover:text-agro">Place Order</a></li>
              <li className="mb-2"><a href="/order/tracking" className="hover:text-agro">Track Order</a></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3">
            <h3 className="text-gray-800 font-bold mb-4">Contact Us</h3>
            <address className="text-gray-600 not-italic">
              <p className="mb-2">Email: info@agrokart.com</p>
              <p className="mb-2">Phone: +1 (555) 123-4567</p>
              <p className="mb-2">Address: 123 Farm Road, Produce City</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-6 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Agrokart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
