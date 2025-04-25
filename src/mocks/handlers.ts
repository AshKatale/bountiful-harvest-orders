
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { Product, Order } from '@/lib/api';

// In-memory database
let products: Product[] = [
  { id: 1, name: 'Organic Apples', pricePerUnit: 2.99, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' },
  { id: 2, name: 'Fresh Tomatoes', pricePerUnit: 1.99, imageUrl: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469' },
  { id: 3, name: 'Potatoes (5kg)', pricePerUnit: 4.50, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655' },
  { id: 4, name: 'Sweet Oranges', pricePerUnit: 3.49, imageUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9' },
  { id: 5, name: 'Ripe Bananas', pricePerUnit: 1.79, imageUrl: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7' },
  { id: 6, name: 'Red Onions (3kg)', pricePerUnit: 3.99, imageUrl: 'https://images.unsplash.com/photo-1620574387735-3624d75b5fcc' },
];

let orders: Order[] = [
  {
    id: uuidv4(),
    productId: 1,
    quantity: 10,
    buyerName: 'John Doe',
    contact: 'john@example.com',
    address: '123 Main St, City',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    productId: 3,
    quantity: 5,
    buyerName: 'Jane Smith',
    contact: '555-123-4567',
    address: '456 Elm St, Town',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    productId: 2,
    quantity: 20,
    buyerName: 'Restaurant Supplies Inc',
    contact: 'orders@restaurant-supplies.com',
    address: '789 Oak Dr, Village',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
];

export const handlers = [
  // GET all products
  http.get('/api/products', () => {
    return HttpResponse.json(products);
  }),

  // GET product by ID
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === Number(id));
    
    if (!product) {
      return new HttpResponse(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return HttpResponse.json(product);
  }),

  // POST create product
  http.post('/api/products', async ({ request }) => {
    const newProduct = await request.json() as Omit<Product, 'id'>;
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    
    const product = { id, ...newProduct };
    products.push(product);
    
    return HttpResponse.json(product, { status: 201 });
  }),

  // PUT update product
  http.put('/api/products/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json() as Partial<Product>;
    const index = products.findIndex((p) => p.id === Number(id));
    
    if (index === -1) {
      return new HttpResponse(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    products[index] = { ...products[index], ...updates };
    return HttpResponse.json(products[index]);
  }),

  // DELETE product
  http.delete('/api/products/:id', ({ params }) => {
    const { id } = params;
    const index = products.findIndex((p) => p.id === Number(id));
    
    if (index === -1) {
      return new HttpResponse(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    products.splice(index, 1);
    return HttpResponse.json({ message: 'Product deleted' });
  }),

  // GET all orders
  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url);
    const buyer = url.searchParams.get('buyer');
    let filteredOrders = orders;
    
    if (buyer) {
      filteredOrders = orders.filter((o) => 
        o.buyerName.toLowerCase().includes(buyer.toLowerCase())
      );
    }
    
    // Add product details to orders
    const ordersWithProducts = filteredOrders.map((order) => {
      const product = products.find((p) => p.id === order.productId);
      return { ...order, product };
    });
    
    return HttpResponse.json(ordersWithProducts);
  }),

  // GET order by ID
  http.get('/api/orders/:id', ({ params }) => {
    const { id } = params;
    const order = orders.find((o) => o.id === id);
    
    if (!order) {
      return new HttpResponse(JSON.stringify({ message: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Add product details to order
    const product = products.find((p) => p.id === order.productId);
    
    return HttpResponse.json({ ...order, product });
  }),

  // POST create order
  http.post('/api/orders', async ({ request }) => {
    const orderData = await request.json() as Omit<Order, 'id' | 'createdAt' | 'status'>;
    
    // Validate product exists
    const product = products.find((p) => p.id === orderData.productId);
    if (!product) {
      return new HttpResponse(JSON.stringify({ message: 'Invalid product ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const newOrder: Order = {
      id: uuidv4(),
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    return HttpResponse.json({ ...newOrder, product }, { status: 201 });
  }),

  // PUT update order status
  http.put('/api/orders/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json() as { status: Order['status'] };
    const index = orders.findIndex((o) => o.id === id);
    
    if (index === -1) {
      return new HttpResponse(JSON.stringify({ message: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    orders[index] = { ...orders[index], status: updates.status };
    
    // Add product details
    const product = products.find((p) => p.id === orders[index].productId);
    
    return HttpResponse.json({ ...orders[index], product });
  }),
];
