import React, { useState } from 'react';
import {
  Bike,
  Store,
  Clock,
  ShieldCheck,
  Tag,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Home,
  Info,
  CreditCard,
  Banknote,
  CheckCircle2,
  Sparkles,
  Utensils
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { StoreSettings, Order } from '../types';
import { formatCurrency, validateOrderForm } from '../utils/cartCalculations';

interface OrderOnlinePageProps {
  settings: StoreSettings;
  setActiveTab: (tab: string) => void;
  onOrderSuccess: (order: Order) => void;
  createOrderAction: (orderData: any) => Order;
}

export const OrderOnlinePage: React.FC<OrderOnlinePageProps> = ({
  settings,
  setActiveTab,
  onOrderSuccess,
  createOrderAction
}) => {
  const {
    items,
    fulfillmentType,
    setFulfillmentType,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totals,
    totalItemsCount,
    clearCart
  } = useCart();

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(settings.deliveryZones[0] || 'New Bazaar, Indri');
  const [landmark, setLandmark] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'cop' | 'online'>('cod');
  
  // Coupons & Validation
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;
    const res = applyCoupon(code);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty! Please add items from the menu.');
      return;
    }

    // Validate using pure utility
    const validation = validateOrderForm({
      customerName,
      customerPhone,
      fulfillmentType,
      address: addressStreet,
      locality: selectedLocality,
      subtotal: totals.subtotal,
      settings: {
        minOrderAmount: settings.minOrderAmount,
        standardDeliveryFee: settings.standardDeliveryFee,
        freeDeliveryThreshold: settings.freeDeliveryThreshold,
        deliveryZones: settings.deliveryZones
      }
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim() || undefined
        },
        fulfillment: fulfillmentType,
        address: fulfillmentType === 'delivery' ? {
          street: addressStreet.trim(),
          locality: selectedLocality,
          landmark: landmark.trim() || undefined,
          pincode: '132041'
        } : undefined,
        items,
        subtotal: totals.subtotal,
        discount: totals.discount,
        couponCode: appliedCoupon?.code,
        deliveryFee: totals.deliveryFee,
        tax: totals.tax,
        grandTotal: totals.grandTotal,
        paymentMethod: fulfillmentType === 'pickup' && paymentMethod === 'cod' ? 'cop' : paymentMethod,
        paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
        specialInstructions: specialInstructions.trim() || undefined
      };

      const placedOrder = createOrderAction(orderPayload);
      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(placedOrder);
    } catch (err) {
      console.error('Failed to submit order:', err);
      setIsSubmitting(false);
      alert('An error occurred while saving your order. Please retry.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-24">
      
      {/* Back to Home & Navigation Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 p-3 sm:p-3.5 rounded-2xl border border-amber-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 text-stone-950" />
            <Home className="w-4 h-4 text-stone-950" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs sm:text-sm font-semibold shadow-2xs transition-colors"
          >
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            <span>Add More Food</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-amber-900 hidden sm:inline">
          Foodies Cafe • Indri, Haryana
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Online Ordering</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Checkout & Fulfillment
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Fast home delivery or takeaway from Foodies Cafe, Indri.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white border border-stone-200 rounded-3xl p-8 space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Your cart is currently empty</h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            Browse through our mouth-watering pizzas, burgers, pastas, momos, and drinks to build your order.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
            >
              Explore Menu
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Customer Details & Fulfillment Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Fulfillment Selection */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">1. Fulfillment Method</span>
                <span className="text-xs text-amber-700 font-semibold">Select One</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFulfillmentType('delivery');
                    if (paymentMethod === 'cop') setPaymentMethod('cod');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'border-amber-500 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 bg-stone-50/60 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bike className={`w-5 h-5 ${fulfillmentType === 'delivery' ? 'text-amber-600' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-sm font-bold text-stone-900">Home Delivery</div>
                      <div className="text-[11px] text-stone-500">Delivery in Indri Town</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-amber-700">
                    Est: {settings.deliveryTimeMinutes}–45 mins
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFulfillmentType('pickup');
                    if (paymentMethod === 'cod') setPaymentMethod('cop');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'border-amber-500 bg-amber-50/80 shadow-xs'
                      : 'border-stone-200 bg-stone-50/60 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Store className={`w-5 h-5 ${fulfillmentType === 'pickup' ? 'text-amber-600' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-sm font-bold text-stone-900">Self Pickup</div>
                      <div className="text-[11px] text-stone-500">Collect at Cafe</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-amber-700">
                    Est: {settings.prepTimeMinutes} mins (₹0 fee)
                  </div>
                </button>
              </div>

              {fulfillmentType === 'pickup' && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Cafe Pickup Address:</span> {settings.address}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Customer Contact Information */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                2. Contact Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sahil Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                  />
                  {formErrors.customerName && (
                    <span className="text-[11px] text-rose-500 font-medium">{formErrors.customerName}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={14}
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono transition-all"
                    />
                  </div>
                  {formErrors.customerPhone && (
                    <span className="text-[11px] text-rose-500 font-medium">{formErrors.customerPhone}</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Email Address <span className="text-stone-400 font-normal text-[11px]">(Optional for order receipt)</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Step 3: Delivery Address (if Delivery) */}
            {fulfillmentType === 'delivery' && (
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  3. Delivery Address in Indri
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Locality / Area <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                    >
                      {settings.deliveryZones.map((zone) => (
                        <option key={zone} value={zone} className="bg-white text-stone-900">
                          {zone}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Landmark <span className="text-stone-400 font-normal text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Vishavkarma Mandir"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    House No. / Building / Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressStreet}
                    onChange={(e) => setAddressStreet(e.target.value)}
                    placeholder="e.g. House #14, Lane 2, Near Main Market"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                  />
                  {formErrors.address && (
                    <span className="text-[11px] text-rose-500 font-medium">{formErrors.address}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Payment Method */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                4. Payment Method
              </span>

              <div className="space-y-2.5">
                {fulfillmentType === 'delivery' ? (
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50/70' : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-amber-600 focus:ring-amber-500 h-4 w-4 border-stone-300"
                      />
                      <div>
                        <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-amber-600" />
                          <span>Cash on Delivery (COD)</span>
                        </div>
                        <div className="text-xs text-stone-500">Pay cash directly when order arrives at your door</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </label>
                ) : (
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cop' ? 'border-amber-500 bg-amber-50/70' : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cop'}
                        onChange={() => setPaymentMethod('cop')}
                        className="text-amber-600 focus:ring-amber-500 h-4 w-4 border-stone-300"
                      />
                      <div>
                        <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-amber-600" />
                          <span>Cash on Pickup</span>
                        </div>
                        <div className="text-xs text-stone-500">Pay cash or UPI directly at cafe counter during pickup</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </label>
                )}

                {/* Online Payment simulator */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'online' ? 'border-amber-500 bg-amber-50/70' : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="text-amber-600 focus:ring-amber-500 h-4 w-4 border-stone-300"
                    />
                    <div>
                      <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-600" />
                        <span>Online UPI / Card Payment (Demo Simulator)</span>
                      </div>
                      <div className="text-xs text-stone-500">Instant test payment simulator (Gateway ready for owner credentials)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                    Demo Mode
                  </span>
                </label>
              </div>
            </div>

            {/* Step 5: Special Instructions */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                5. Special Instructions or Delivery Notes
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Please ring bell twice, extra ketchup, make it less spicy"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

          </div>

          {/* Right Column: Order Summary & Review (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-base font-bold text-stone-900">Order Summary</h3>
                <span className="text-xs text-stone-500">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
              </div>

              {/* Items in Basket */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => {
                  let unit = item.price;
                  if (item.selectedSize) unit += item.selectedSize.price;
                  if (item.selectedCrust) unit += item.selectedCrust.price;
                  if (item.selectedAddons) {
                    item.selectedAddons.forEach((a) => (unit += a.price));
                  }

                  return (
                    <div key={item.id} className="flex items-start justify-between text-xs py-1.5 border-b border-stone-100 pb-2 gap-2.5">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0 bg-[#f4efe6]"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      <div className="flex-1 pr-2">
                        <div className="font-bold text-stone-900">
                          {item.quantity} × {item.name}
                        </div>
                        {(item.selectedSize || item.selectedCrust) && (
                          <div className="text-[11px] text-stone-500">
                            {[item.selectedSize?.name, item.selectedCrust?.name].filter(Boolean).join(' • ')}
                          </div>
                        )}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <div className="text-[10px] text-amber-700 font-medium">
                            +{item.selectedAddons.map((a) => a.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-stone-900 tabular-nums">
                        {formatCurrency(unit * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Box */}
              <div className="pt-2 space-y-2 border-t border-stone-200">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                    <span className="text-amber-800 font-bold">{appliedCoupon.code} applied (-{formatCurrency(totals.discount)})</span>
                    <button onClick={removeCoupon} className="text-rose-600 font-semibold hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code"
                      className="flex-1 uppercase px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponMsg && (
                  <div className={`text-[11px] font-semibold ${couponMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {couponMsg.text}
                  </div>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-stone-900">{formatCurrency(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatCurrency(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="tabular-nums">
                    {totals.deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatCurrency(totals.deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Restaurant GST (5%)</span>
                  <span className="tabular-nums">{formatCurrency(totals.tax)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-amber-700 text-lg tabular-nums">{formatCurrency(totals.grandTotal)}</span>
                </div>
              </div>

              {/* Minimum Order Error */}
              {formErrors.subtotal && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formErrors.subtotal}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Saving Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order ({formatCurrency(totals.grandTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-stone-500 text-center leading-relaxed">
                By placing this order, you confirm ordering from Foodies Cafe, Indri. We will begin preparing your food immediately.
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
