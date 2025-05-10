
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Package } from "lucide-react";

const Navbar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-agro py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Agrokart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-gray-200">
              Products
            </Link>
            <Link to="/order/tracking" className="text-white hover:text-gray-200">
              Track Order
            </Link>
            <Link to="/admin" className="text-white hover:text-gray-200">
              Admin
            </Link>
            {children}
          </div>

          {/* Mobile Navigation Button & Cart Button */}
          <div className="md:hidden flex items-center space-x-4">
            {children}
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                to="/order/tracking"
                className="text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Track Order
              </Link>
              <Link
                to="/admin"
                className="text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
