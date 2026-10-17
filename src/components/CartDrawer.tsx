import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bike, Store, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/cartCalculations';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    fulfillmentType,
    setFulfillmentType,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    totals,
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;
    const res = applyCoupon(code);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onProceedToCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Your Food Basket</h2>
                <span className="text-xs text-stone-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="p-4 bg-stone-50/70 border-b border-stone-200">
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/60 rounded-xl">
              <button
                onClick={() => setFulfillmentType('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  fulfillmentType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Home Delivery</span>
              </button>
              <button
                onClick={() => setFulfillmentType('pickup')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  fulfillmentType === 'pickup'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Self Pickup</span>
              </button>
            </div>

            {/* Free Delivery Bar for Delivery Orders */}
            {fulfillmentType === 'delivery' && (
              <div className="mt-3">
                {totals.qualifiesForFreeDelivery ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span>Unlocked <strong>FREE Delivery</strong> in Indri!</span>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between text-[11px]">
                      <span>Add {formatCurrency(totals.amountNeededForFreeDelivery)} more for <strong>FREE Delivery</strong></span>
                      <span className="font-bold text-amber-700">{Math.round((totals.subtotal / 299) * 100)}%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (totals.subtotal / 299) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-white">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Satisfy your cravings with our hot pizzas, juicy burgers, momos, and chilled shakes!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition-all"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map((item) => {
                let unit = item.price;
                if (item.selectedSize) unit += item.selectedSize.price;
                if (item.selectedCrust) unit += item.selectedCrust.price;
                if (item.selectedAddons) {
                  item.selectedAddons.forEach((a) => (unit += a.price));
                }

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0 bg-[#f4efe6]"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-stone-900 truncate">{item.name}</h4>
                        <div className="text-xs font-bold text-amber-700 mt-0.5">
                          {formatCurrency(unit)} each
                        </div>

                        {/* Customization Badges */}
                        {(item.selectedSize || item.selectedCrust || (item.selectedAddons && item.selectedAddons.length > 0)) && (
                          <div className="flex flex-wrap gap-1 mt-1.5 text-[10px] text-stone-600">
                            {item.selectedSize && (
                              <span className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-800">
                                {item.selectedSize.name}
                              </span>
                            )}
                            {item.selectedCrust && (
                              <span className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-800">
                                {item.selectedCrust.name}
                              </span>
                            )}
                            {item.selectedAddons?.map((a) => (
                              <span key={a.name} className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                                +{a.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[11px] text-stone-500 italic mt-1">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white border border-stone-200 px-2 py-1 rounded-lg shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-stone-900 tabular-nums">
                        {formatCurrency(unit * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Checkout & Billing Details */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-4">
              
              {/* Coupon Engine */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                    <div className="flex items-center gap-2 text-amber-800 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      <span>{appliedCoupon.code} Applied</span>
                      <span className="text-stone-600 font-normal">(-{formatCurrency(totals.discount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo Code (e.g. FOODIE10)"
                        className="flex-1 uppercase px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 shadow-2xs"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold shadow-2xs"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick Coupon Chips */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-600">
                      <span>Try:</span>
                      <button
                        onClick={() => handleApplyCoupon('FOODIE10')}
                        className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-900 hover:bg-amber-200 font-medium"
                      >
                        FOODIE10 (10% OFF)
                      </button>
                      <button
                        onClick={() => handleApplyCoupon('WELCOME50')}
                        className="px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-900 hover:bg-amber-200 font-medium"
                      >
                        WELCOME50 (₹50 OFF)
                      </button>
                    </div>
                  </div>
                )}

                {couponMsg && (
                  <p className={`text-[11px] font-medium ${couponMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="tabular-nums text-stone-900 font-semibold">{formatCurrency(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">-{formatCurrency(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge ({fulfillmentType === 'delivery' ? 'Indri' : 'Pickup'})</span>
                  <span className="tabular-nums font-semibold">
                    {totals.deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatCurrency(totals.deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Restaurant GST (5%)</span>
                  <span className="tabular-nums font-medium">{formatCurrency(totals.tax)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>To Pay</span>
                  <span className="text-amber-700 text-base tabular-nums font-extrabold">{formatCurrency(totals.grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
              >
                <span>Checkout</span>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums">{formatCurrency(totals.grandTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
