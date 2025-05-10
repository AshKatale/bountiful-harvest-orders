
import { ShoppingCart, X, Trash, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageUrl || `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9`}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>{item.name}</h3>
          <p className="ml-4">${(item.pricePerUnit * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    setIsCartOpen(false);
  };

  const handleContinueShopping = () => {
    navigate('/products');
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-hidden">
        <div className="flex h-full flex-col bg-white py-6">
          <div className="px-4 sm:px-6 flex items-center justify-between border-b pb-3 mb-3">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Cart
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start adding some items to your cart!
                </p>
                <Button
                  className="mt-6"
                  onClick={handleContinueShopping}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${getCartTotal().toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleCheckout} size="lg" className="w-full">
                  Continue to Shipping
                </Button>
                <Button 
                  onClick={handleContinueShopping} 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
