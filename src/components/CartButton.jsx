
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

const CartButton = () => {
  const { toggleCart, getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleCart}
      className="relative"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
