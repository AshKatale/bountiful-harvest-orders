
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });

  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, we would send this to an API
    console.log('Order submitted:', {
      customer: formData,
      items: cartItems,
      total: getCartTotal()
    });
    
    // Generate a random order ID for tracking
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    toast.success("Order placed successfully! We'll contact you shortly.");
    
    // Navigate to order tracking with the new order ID
    navigate(`/order/tracking`, { 
      state: { 
        orderId: orderId
      } 
    });
    clearCart();
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} x ${item.pricePerUnit.toFixed(2)}</p>
                  </div>
                  <p className="font-medium">${(item.quantity * item.pricePerUnit).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${getCartTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Information Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Full Name *</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  placeholder="John Doe"
                  className="px-3 py-2"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">Email *</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  placeholder="your@email.com"
                  className="px-3 py-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block font-medium">Phone Number *</label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                onChange={handleChange} 
                required
                placeholder="(123) 456-7890"
                className="px-3 py-2"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="block font-medium">Address *</label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required
                placeholder="123 Street Name"
                className="px-3 py-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="block font-medium">City *</label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required
                  placeholder="City"
                  className="px-3 py-2"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="block font-medium">State *</label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  required
                  placeholder="State"
                  className="px-3 py-2"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="zipCode" className="block font-medium">ZIP Code *</label>
                <Input 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode} 
                  onChange={handleChange} 
                  required
                  placeholder="ZIP Code"
                  className="px-3 py-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block font-medium">Additional Notes</label>
              <Textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="Special delivery instructions or other notes"
                rows={4}
                className="px-3 py-2"
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg">
                Place Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
