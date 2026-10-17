import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  validateIndianMobile,
  calculateCartTotals,
  validateOrderForm,
  getItemUnitPrice,
  DEFAULT_DELIVERY_SETTINGS
} from './cartCalculations.ts';
import type { CartItem, Coupon } from './cartCalculations.ts';

test('formatCurrency correctly formats Indian Rupees', () => {
  assert.equal(formatCurrency(129), '₹129');
  assert.equal(formatCurrency(1250), '₹1,250');
  assert.equal(formatCurrency(0), '₹0');
});

test('validateIndianMobile handles standard 10 digit Indian mobile numbers', () => {
  assert.equal(validateIndianMobile('9876543210'), true);
  assert.equal(validateIndianMobile('+91 84275 25253'), true);
  assert.equal(validateIndianMobile('8427525253'), true);
  assert.equal(validateIndianMobile('7012345678'), true);
  assert.equal(validateIndianMobile('6123456789'), true);

  // Invalid cases
  assert.equal(validateIndianMobile('1234567890'), false); // Starts with 1
  assert.equal(validateIndianMobile('98765'), false); // Too short
  assert.equal(validateIndianMobile('987654321012'), false); // Too long
  assert.equal(validateIndianMobile('abcdefghij'), false);
  assert.equal(validateIndianMobile(''), false);
});

test('getItemUnitPrice accounts for sizes and addons', () => {
  const item: CartItem = {
    id: 'c1',
    productId: 'p1',
    name: 'Margherita Pizza',
    price: 129,
    quantity: 1,
    selectedSize: { name: 'Medium (+₹60)', price: 60 },
    selectedCrust: { name: 'Cheese Burst (+₹50)', price: 50 },
    selectedAddons: [
      { name: 'Extra Mozzarella', price: 35 },
      { name: 'Jalapenos', price: 25 }
    ]
  };

  // 129 + 60 + 50 + 35 + 25 = 299
  assert.equal(getItemUnitPrice(item), 299);
});

test('calculateCartTotals calculates subtotal, discounts, delivery fee, GST, and total', () => {
  const items: CartItem[] = [
    {
      id: 'c1',
      productId: 'p1',
      name: 'Farm Fresh Pizza',
      price: 179,
      quantity: 1
    }
  ];

  // Delivery order under free threshold (179 < 299)
  const totalsNoDiscount = calculateCartTotals(items, 'delivery', null, DEFAULT_DELIVERY_SETTINGS);
  assert.equal(totalsNoDiscount.subtotal, 179);
  assert.equal(totalsNoDiscount.discount, 0);
  assert.equal(totalsNoDiscount.deliveryFee, 30);
  // Tax: 5% of 179 = 8.95 -> 9
  assert.equal(totalsNoDiscount.tax, 9);
  // Grand total: 179 + 30 + 9 = 218
  assert.equal(totalsNoDiscount.grandTotal, 218);
  assert.equal(totalsNoDiscount.qualifiesForFreeDelivery, false);
  assert.equal(totalsNoDiscount.amountNeededForFreeDelivery, 120);

  // Self Pickup: delivery fee is 0
  const totalsPickup = calculateCartTotals(items, 'pickup', null, DEFAULT_DELIVERY_SETTINGS);
  assert.equal(totalsPickup.deliveryFee, 0);
  assert.equal(totalsPickup.grandTotal, 179 + 9);

  // Percentage coupon: 10% off
  const coupon10: Coupon = {
    code: 'FOODIE10',
    type: 'percentage',
    value: 10,
    minOrder: 150,
    description: '10% off on orders above ₹150'
  };

  const totalsWithCoupon = calculateCartTotals(items, 'delivery', coupon10, DEFAULT_DELIVERY_SETTINGS);
  assert.equal(totalsWithCoupon.discount, 18); // 10% of 179 = 17.9 -> 18
  // Tax: 5% of (179 - 18 = 161) = 8.05 -> 8
  assert.equal(totalsWithCoupon.tax, 8);
  // Grand total: (179 - 18) + 30 + 8 = 199
  assert.equal(totalsWithCoupon.grandTotal, 199);
});

test('calculateCartTotals grants free delivery over freeDeliveryThreshold', () => {
  const items: CartItem[] = [
    {
      id: 'c1',
      productId: 'p1',
      name: 'Cheese Burst Pizza',
      price: 229,
      quantity: 2
    }
  ]; // Subtotal 458 >= 299

  const totals = calculateCartTotals(items, 'delivery', null, DEFAULT_DELIVERY_SETTINGS);
  assert.equal(totals.subtotal, 458);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.qualifiesForFreeDelivery, true);
  assert.equal(totals.amountNeededForFreeDelivery, 0);
});

test('validateOrderForm validates required inputs and delivery fields', () => {
  // Invalid empty form
  const emptyRes = validateOrderForm({
    customerName: '',
    customerPhone: '',
    fulfillmentType: 'delivery',
    address: '',
    locality: '',
    subtotal: 50
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.customerName);
  assert.ok(emptyRes.errors.customerPhone);
  assert.ok(emptyRes.errors.address);
  assert.ok(emptyRes.errors.subtotal);

  // Valid delivery form
  const validRes = validateOrderForm({
    customerName: 'Rohit Verma',
    customerPhone: '9876543210',
    fulfillmentType: 'delivery',
    address: 'House #45, Near Main Market',
    locality: 'New Bazaar, Indri',
    subtotal: 180
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);

  // Valid pickup form does not require address/locality
  const validPickup = validateOrderForm({
    customerName: 'Priya Saini',
    customerPhone: '8427525253',
    fulfillmentType: 'pickup',
    subtotal: 120
  });
  assert.equal(validPickup.isValid, true);
});
