
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

const CartButton = () => {
  const { toggleCart, getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleCart}
      className="relative bg-white"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
