export interface CartItemOption {
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: CartItemOption;
  selectedCrust?: CartItemOption;
  selectedAddons?: CartItemOption[];
  specialInstructions?: string;
  imageUrl?: string;
  foodType?: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  description: string;
}

export interface DeliverySettings {
  minOrderAmount: number;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryZones: string[];
}

export const DEFAULT_DELIVERY_SETTINGS: DeliverySettings = {
  minOrderAmount: 99,
  standardDeliveryFee: 30,
  freeDeliveryThreshold: 299,
  deliveryZones: [
    'New Bazaar, Indri',
    'Khukhani, Indri',
    'Near Vishavkarma Mandir, Indri',
    'Main Bazaar, Indri',
    'Grain Market, Indri',
    'Karnal Road, Indri',
    'Ladwa Road, Indri',
    'Model Town, Indri',
    'Court Complex, Indri',
    'G.T. Road Link, Indri'
  ]
};

export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

export function validateIndianMobile(phone: string): boolean {
  if (!phone) return false;
  // Clean phone string (remove spaces, hyphens, leading +91 or 0)
  const cleaned = phone.replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)/, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function getItemUnitPrice(item: CartItem): number {
  let unit = item.price;
  if (item.selectedSize) {
    unit += item.selectedSize.price;
  }
  if (item.selectedCrust) {
    unit += item.selectedCrust.price;
  }
  if (item.selectedAddons && item.selectedAddons.length > 0) {
    for (const addon of item.selectedAddons) {
      unit += addon.price;
    }
  }
  return unit;
}

export function calculateCartTotals(
  items: CartItem[],
  fulfillmentType: 'delivery' | 'pickup',
  appliedCoupon: Coupon | null,
  settings: DeliverySettings = DEFAULT_DELIVERY_SETTINGS
) {
  let subtotal = 0;
  for (const item of items) {
    const unitPrice = getItemUnitPrice(item);
    subtotal += unitPrice * item.quantity;
  }

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.type === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = appliedCoupon.value;
    }
    // Cap discount at subtotal
    discount = Math.min(discount, subtotal);
  }

  let deliveryFee = 0;
  if (fulfillmentType === 'delivery') {
    if (subtotal >= settings.freeDeliveryThreshold) {
      deliveryFee = 0;
    } else {
      deliveryFee = settings.standardDeliveryFee;
    }
  }

  // Restaurant tax: 5% GST on cafe food services in India
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.05);

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  return {
    subtotal,
    discount,
    deliveryFee,
    tax,
    grandTotal,
    qualifiesForFreeDelivery: fulfillmentType === 'delivery' && subtotal >= settings.freeDeliveryThreshold,
    amountNeededForFreeDelivery: fulfillmentType === 'delivery' && subtotal < settings.freeDeliveryThreshold
      ? settings.freeDeliveryThreshold - subtotal
      : 0
  };
}

export function validateOrderForm(params: {
  customerName: string;
  customerPhone: string;
  fulfillmentType: 'delivery' | 'pickup';
  address?: string;
  locality?: string;
  subtotal: number;
  settings?: DeliverySettings;
}): { isValid: boolean; errors: Record<string, string> } {
  const settings = params.settings || DEFAULT_DELIVERY_SETTINGS;
  const errors: Record<string, string> = {};

  if (!params.customerName || params.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (at least 2 letters)';
  }

  if (!validateIndianMobile(params.customerPhone)) {
    errors.customerPhone = 'Please enter a valid 10-digit Indian mobile number';
  }

  if (params.fulfillmentType === 'delivery') {
    if (!params.address || params.address.trim().length < 5) {
      errors.address = 'Please enter complete house/street address';
    }
    if (!params.locality || params.locality.trim().length < 2) {
      errors.locality = 'Please select or enter your locality in Indri';
    }
  }

  if (params.subtotal < settings.minOrderAmount) {
    errors.subtotal = `Minimum order amount is ${formatCurrency(settings.minOrderAmount)}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
