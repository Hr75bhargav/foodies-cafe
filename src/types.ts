import { CartItem, Coupon as BaseCoupon, DeliverySettings } from './utils/cartCalculations';

export type { CartItem, DeliverySettings };

export interface CustomizationOption {
  name: string;
  price: number;
}

export type MenuCategory = 
  | 'All'
  | 'Pizza'
  | 'Burgers'
  | 'Sandwiches'
  | 'Pasta'
  | 'Momos & Snacks'
  | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Pizza' | 'Burgers' | 'Sandwiches' | 'Pasta' | 'Momos & Snacks' | 'Beverages';
  price: number;
  description: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  foodType: 'pizza' | 'burger' | 'sandwich' | 'pasta' | 'momos' | 'fries' | 'beverage' | 'coffee';
  sizes?: CustomizationOption[];
  crusts?: CustomizationOption[];
  addons?: CustomizationOption[];
}

export interface Coupon extends BaseCoupon {
  active: boolean;
}

export type OrderStatus = 
  | 'received'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface StatusUpdate {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  fulfillment: 'delivery' | 'pickup';
  address?: {
    street: string;
    locality: string;
    landmark?: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  paymentMethod: 'cod' | 'cop' | 'online';
  paymentStatus: 'pending' | 'paid';
  status: OrderStatus;
  statusHistory: StatusUpdate[];
  specialInstructions?: string;
  cancellationReason?: string;
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  googleMapsUrl: string;
  instagramHandle: string;
  isOpen: boolean;
  prepTimeMinutes: number;
  deliveryTimeMinutes: number;
  announcement: string;
  announcementActive: boolean;
  minOrderAmount: number;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryZones: string[];
  openingHours: {
    days: string;
    time: string;
  }[];
}
