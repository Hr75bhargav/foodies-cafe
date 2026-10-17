import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Bike,
  Store,
  ExternalLink,
  Search,
  AlertCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Home,
  Utensils
} from 'lucide-react';
import { Order, StoreSettings, OrderStatus } from '../types';
import { formatCurrency } from '../utils/cartCalculations';

interface CheckoutPageProps {
  currentOrder: Order | null;
  settings: StoreSettings;
  setActiveTab: (tab: string) => void;
  onSearchOrder: (id: string) => Order | undefined;
  onCancelOrder: (id: string, reason: string) => boolean;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  currentOrder,
  settings,
  setActiveTab,
  onSearchOrder,
  onCancelOrder
}) => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(currentOrder);
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of plans');
  const [cancelStatusMsg, setCancelStatusMsg] = useState('');

  // Handle tracking lookup
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = onSearchOrder(searchId.trim());
    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError(`No order found matching "${searchId.toUpperCase()}". Please check your Order ID.`);
    }
  };

  const handleCancelSubmit = () => {
    if (!activeOrder) return;
    const success = onCancelOrder(activeOrder.id, cancelReason);
    if (success) {
      setActiveOrder({
        ...activeOrder,
        status: 'cancelled',
        cancellationReason: cancelReason
      });
      setCancelModalOpen(false);
      setCancelStatusMsg('Order has been cancelled successfully.');
    } else {
      setCancelStatusMsg('This order cannot be cancelled as it is already being prepared or out for delivery. Please call the cafe.');
    }
  };

  const getStatusStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'received': return 0;
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'ready_for_pickup':
      case 'out_for_delivery': return 3;
      case 'completed': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const steps = [
    { title: 'Order Received', desc: 'Sent to cafe kitchen' },
    { title: 'Confirmed', desc: 'Cafe acknowledged' },
    { title: 'Preparing', desc: 'Chef cooking fresh' },
    {
      title: activeOrder?.fulfillment === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
      desc: activeOrder?.fulfillment === 'pickup' ? 'Waiting at counter' : 'Driver on the way'
    },
    { title: 'Completed', desc: 'Enjoy your food!' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-24">
      
      {/* Prominent Back to Home Banner */}
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
            <span>Order More Food</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-amber-900 hidden sm:inline">
          Foodies Cafe • Indri, Haryana
        </span>
      </div>

      {/* Track Another Order Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-700">
          <Search className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Have an existing order? Enter your Order ID to track status:</span>
        </div>

        <form onSubmit={handleTrackOrder} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="e.g. FC-1082"
            className="uppercase px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
          >
            Track
          </button>
        </form>
      </div>

      {searchError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{searchError}</span>
        </div>
      )}

      {cancelStatusMsg && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{cancelStatusMsg}</span>
        </div>
      )}

      {!activeOrder ? (
        <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-stone-200 shadow-sm p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">No active order selected</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Place an online order or enter your Order ID above to check live kitchen status and tracking updates.
          </p>
          <div className="flex justify-center gap-3 pt-2">
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
              onClick={() => setActiveTab('order')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
            >
              Start an Order
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Order Header / Confirmation Banner */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
            activeOrder.status === 'cancelled'
              ? 'bg-rose-50/50 border-rose-200'
              : 'bg-gradient-to-b from-amber-50/60 to-white border-amber-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  activeOrder.status === 'cancelled'
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {activeOrder.status === 'cancelled' ? (
                    <XCircle className="w-6 h-6" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                      Order ID: {activeOrder.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      activeOrder.paymentMethod === 'cod'
                        ? 'bg-stone-100 text-stone-700 border border-stone-200'
                        : activeOrder.paymentMethod === 'cop'
                        ? 'bg-stone-100 text-stone-700 border border-stone-200'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    }`}>
                      {activeOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : activeOrder.paymentMethod === 'cop' ? 'Cash on Pickup' : 'Paid Online'}
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                    {activeOrder.status === 'cancelled'
                      ? 'Order Cancelled'
                      : 'Order Confirmed & Placed!'}
                  </h1>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-stone-500">Total Payable</div>
                <div className="text-2xl font-extrabold text-amber-700 tabular-nums">
                  {formatCurrency(activeOrder.grandTotal)}
                </div>
              </div>
            </div>

            {/* Status Progress Stepper */}
            {activeOrder.status !== 'cancelled' ? (
              <div className="mt-8 pt-6 border-t border-amber-200/60">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-4">
                  Live Order Status Tracker
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {steps.map((step, idx) => {
                    const currentIndex = getStatusStepIndex(activeOrder.status);
                    const isDone = currentIndex >= idx;
                    const isCurrent = currentIndex === idx;

                    return (
                      <div
                        key={step.title}
                        className={`p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? 'border-amber-500 bg-amber-50 text-stone-900 shadow-xs'
                            : isDone
                            ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900'
                            : 'border-stone-200 bg-stone-50/50 text-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                          )}
                          <span className="truncate">{step.title}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                <strong>Reason:</strong> {activeOrder.cancellationReason || 'Cancelled by customer'}
              </div>
            )}
          </div>

          {/* Contact Cafe & Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Foodies%20Cafe,%20inquiring%20about%20Order%20${activeOrder.id}`}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/70 transition-all flex items-center justify-between text-emerald-900 group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">WhatsApp Updates</div>
                  <div className="text-xs text-stone-600">Chat with cafe about Order {activeOrder.id}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between text-stone-800 group shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">Call Foodies Cafe</div>
                  <div className="text-xs text-stone-500">{settings.phone}</div>
                </div>
              </div>
              <Phone className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
            </a>
          </div>

          {/* Order Details & Receipt */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Order Receipt & Breakdown</h3>
                <span className="text-xs text-stone-500">
                  Placed on {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {activeOrder.status !== 'cancelled' && activeOrder.status !== 'completed' && activeOrder.status !== 'out_for_delivery' && (
                <button
                  onClick={() => setCancelModalOpen(true)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Request Cancellation
                </button>
              )}
            </div>

            {/* Customer & Fulfillment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-stone-500 font-semibold block">Customer Information</span>
                <div className="text-sm font-bold text-stone-900">{activeOrder.customer.name}</div>
                <div className="text-stone-700 font-mono">+91 {activeOrder.customer.phone}</div>
                {activeOrder.customer.email && (
                  <div className="text-stone-500">{activeOrder.customer.email}</div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-stone-500 font-semibold block">
                  {activeOrder.fulfillment === 'delivery' ? 'Delivery Destination' : 'Pickup Location'}
                </span>
                {activeOrder.fulfillment === 'delivery' && activeOrder.address ? (
                  <>
                    <div className="text-sm font-bold text-stone-900">{activeOrder.address.locality}</div>
                    <div className="text-stone-700">{activeOrder.address.street}</div>
                    {activeOrder.address.landmark && (
                      <div className="text-stone-500">Landmark: {activeOrder.address.landmark}</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-sm font-bold text-stone-900">Foodies Cafe Counter</div>
                    <div className="text-stone-700">{settings.address}</div>
                  </>
                )}
              </div>
            </div>

            {/* Itemized List */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Ordered Items
              </span>
              <div className="divide-y divide-stone-100">
                {activeOrder.items.map((item, idx) => {
                  let unit = item.price;
                  if (item.selectedSize) unit += item.selectedSize.price;
                  if (item.selectedCrust) unit += item.selectedCrust.price;
                  if (item.selectedAddons) {
                    item.selectedAddons.forEach((a) => (unit += a.price));
                  }

                  return (
                    <div key={idx} className="py-2.5 flex items-start justify-between text-xs">
                      <div>
                        <div className="text-stone-900 font-bold">
                          {item.quantity} × {item.name}
                        </div>
                        {(item.selectedSize || item.selectedCrust) && (
                          <div className="text-stone-500 text-[11px]">
                            {[item.selectedSize?.name, item.selectedCrust?.name].filter(Boolean).join(' • ')}
                          </div>
                        )}
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <div className="text-amber-700 text-[10px] font-medium">
                            +{item.selectedAddons.map((a) => a.name).join(', ')}
                          </div>
                        )}
                        {item.specialInstructions && (
                          <div className="text-stone-500 italic text-[10px]">
                            Note: {item.specialInstructions}
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
            </div>

            {/* Summary Price Math */}
            <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-stone-900">{formatCurrency(activeOrder.subtotal)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({activeOrder.couponCode})</span>
                  <span className="tabular-nums">-{formatCurrency(activeOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="tabular-nums">
                  {activeOrder.deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatCurrency(activeOrder.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Restaurant GST (5%)</span>
                <span className="tabular-nums">{formatCurrency(activeOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="text-amber-700 tabular-nums">{formatCurrency(activeOrder.grandTotal)}</span>
              </div>
            </div>

          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold shadow-2xs"
            >
              Continue Browsing Menu
            </button>
          </div>

        </div>
      )}

      {/* Cancellation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-stone-900">Cancel Order {activeOrder?.id}?</h3>
            <p className="text-xs text-stone-600">
              Orders can only be cancelled while in "Received" or "Confirmed" state. Please select a reason:
            </p>

            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
            >
              <option value="Change of plans">Change of plans</option>
              <option value="Ordered by mistake">Ordered by mistake</option>
              <option value="Need to change items/address">Need to change items/address</option>
              <option value="Taking too long">Taking too long</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelSubmit}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
