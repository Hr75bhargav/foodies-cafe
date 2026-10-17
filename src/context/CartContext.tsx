import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Coupon, MenuItem, DeliverySettings } from '../types';
import { calculateCartTotals, formatCurrency, DEFAULT_DELIVERY_SETTINGS } from '../utils/cartCalculations';
import { CafeStore } from '../utils/storeManager';

const CART_STORAGE_KEY = 'foodies_cafe_cart_v1';
const FULFILLMENT_STORAGE_KEY = 'foodies_cafe_fulfillment_v1';
const COUPON_STORAGE_KEY = 'foodies_cafe_applied_coupon_v1';

interface CartContextType {
  items: CartItem[];
  fulfillmentType: 'delivery' | 'pickup';
  setFulfillmentType: (type: 'delivery' | 'pickup') => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addToCart: (
    item: MenuItem,
    customization?: {
      size?: { name: string; price: number };
      crust?: { name: string; price: number };
      addons?: { name: string; price: number }[];
      notes?: string;
    },
    quantity?: number
  ) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totals: ReturnType<typeof calculateCartTotals>;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [fulfillmentType, setFulfillmentTypeState] = useState<'delivery' | 'pickup'>(() => {
    try {
      const stored = localStorage.getItem(FULFILLMENT_STORAGE_KEY);
      return (stored === 'pickup' ? 'pickup' : 'delivery');
    } catch {
      return 'delivery';
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [settings, setSettings] = useState(() => CafeStore.getSettings());

  // Listen for settings changes from admin
  useEffect(() => {
    const unsub = CafeStore.subscribe(() => {
      setSettings(CafeStore.getSettings());
    });
    return unsub;
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart:', err);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(FULFILLMENT_STORAGE_KEY, fulfillmentType);
    } catch (err) {
      console.error('Failed to save fulfillment:', err);
    }
  }, [fulfillmentType]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to save coupon:', err);
    }
  }, [appliedCoupon]);

  const setFulfillmentType = (type: 'delivery' | 'pickup') => {
    setFulfillmentTypeState(type);
  };

  const addToCart = (
    item: MenuItem,
    customization?: {
      size?: { name: string; price: number };
      crust?: { name: string; price: number };
      addons?: { name: string; price: number }[];
      notes?: string;
    },
    quantity: number = 1
  ) => {
    // Generate a unique item key based on customizations
    const customKey = `${item.id}-${customization?.size?.name || ''}-${customization?.crust?.name || ''}-${(customization?.addons || []).map(a => a.name).sort().join(',')}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === customKey);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      const newItem: CartItem = {
        id: customKey,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        selectedSize: customization?.size,
        selectedCrust: customization?.crust,
        selectedAddons: customization?.addons,
        specialInstructions: customization?.notes,
        imageUrl: item.imageUrl,
        foodType: item.foodType
      };

      return [...prev, newItem];
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const rawSubtotal = items.reduce((sum, item) => {
      let unit = item.price;
      if (item.selectedSize) unit += item.selectedSize.price;
      if (item.selectedCrust) unit += item.selectedCrust.price;
      if (item.selectedAddons) {
        item.selectedAddons.forEach((a) => (unit += a.price));
      }
      return sum + unit * item.quantity;
    }, 0);

    const res = CafeStore.applyCouponCode(code, rawSubtotal);
    if (res.success && res.coupon) {
      setAppliedCoupon(res.coupon);
      return {
        success: true,
        message: `Coupon "${res.coupon.code}" applied! You saved ${res.coupon.type === 'percentage' ? `${res.coupon.value}%` : `₹${res.coupon.value}`}.`
      };
    } else {
      return {
        success: false,
        message: res.error || 'Failed to apply coupon.'
      };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Re-verify coupon against subtotal
  const currentDeliverySettings: DeliverySettings = {
    minOrderAmount: settings.minOrderAmount,
    standardDeliveryFee: settings.standardDeliveryFee,
    freeDeliveryThreshold: settings.freeDeliveryThreshold,
    deliveryZones: settings.deliveryZones
  };

  const totals = calculateCartTotals(items, fulfillmentType, appliedCoupon, currentDeliverySettings);

  const totalItemsCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        fulfillmentType,
        setFulfillmentType,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totals,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
