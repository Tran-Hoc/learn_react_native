export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Omit<Product, "description"> {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export interface Order {
  id: number;
  items: CartItem[];
  totalPrice: number;
  customerInfo: { name: string; email: string; address: string };
  status: OrderStatus;
  createdAt: Date;
}
