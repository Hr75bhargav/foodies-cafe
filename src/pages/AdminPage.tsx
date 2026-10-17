import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Store,
  ShoppingBag,
  TrendingUp,
  Clock,
  Sparkles,
  Save,
  RotateCcw,
  Tag,
  AlertCircle,
  Phone,
  Eye,
  Sliders,
  ArrowLeft,
  Home
} from 'lucide-react';
import { MenuItem, Order, StoreSettings, Coupon, OrderStatus } from '../types';
import { formatCurrency } from '../utils/cartCalculations';

interface AdminPageProps {
  menu: MenuItem[];
  orders: Order[];
  settings: StoreSettings;
  coupons: Coupon[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  onDeleteMenuItem: (id: string) => void;
  onResetMenu: () => void;
  onUpdateOrderStatus: (id: string, newStatus: OrderStatus, note?: string) => boolean;
  onSaveSettings: (settings: StoreSettings) => void;
  onSaveCoupons: (coupons: Coupon[]) => void;
  setActiveTab: (tab: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  menu,
  orders,
  settings,
  coupons,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onResetMenu,
  onUpdateOrderStatus,
  onSaveSettings,
  onSaveCoupons,
  setActiveTab
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Section Tab
  const [adminTab, setAdminTab] = useState<'orders' | 'menu' | 'settings' | 'coupons'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('active');

  // Product Edit Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [itemForm, setItemForm] = useState<Partial<MenuItem>>({
    name: '',
    category: 'Pizza',
    price: 129,
    description: '',
    isVeg: true,
    isAvailable: true,
    foodType: 'pizza',
    isBestseller: false,
    isNew: false
  });

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...settings });
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(150);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Handle PIN Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN. (Default Owner PIN is 1234)');
    }
  };

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.grandTotal, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status !== 'completed' && o.status !== 'cancelled'
  ).length;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'active') return o.status !== 'completed' && o.status !== 'cancelled';
    if (orderFilter === 'completed') return o.status === 'completed';
    if (orderFilter === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  // Open Edit Modal
  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setItemForm({ ...item });
    setIsCreatingNew(false);
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setItemForm({
      id: `custom-${Date.now()}`,
      name: '',
      category: 'Pizza',
      price: 99,
      description: '',
      isVeg: true,
      isAvailable: true,
      foodType: 'pizza',
      isBestseller: false,
      isNew: true
    });
    setIsCreatingNew(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name?.trim() || !itemForm.price) return;

    if (isCreatingNew) {
      onAddMenuItem(itemForm as MenuItem);
    } else if (editingItem) {
      onUpdateMenuItem(editingItem.id, itemForm);
    }
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleSaveSettingsForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(settingsForm);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      type: newCouponType,
      value: Number(newCouponValue),
      minOrder: Number(newCouponMinOrder),
      description: newCouponDesc.trim() || `${newCouponType === 'percentage' ? `${newCouponValue}%` : `₹${newCouponValue}`} off`,
      active: true
    };

    onSaveCoupons([newC, ...coupons]);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  const toggleCouponActive = (code: string) => {
    const updated = coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c));
    onSaveCoupons(updated);
  };

  const deleteCoupon = (code: string) => {
    const updated = coupons.filter((c) => c.code !== code);
    onSaveCoupons(updated);
  };

  // IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        
        {/* Back to Home Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-stone-950" />
            <Home className="w-4 h-4 text-stone-950" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-stone-900">Owner Admin Portal</h1>
          <p className="text-xs text-stone-600">
            Secure cafe management dashboard for Foodies Cafe, Indri.
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-stone-700 block">Enter Admin PIN</label>
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center text-lg tracking-widest text-stone-900 focus:bg-white focus:outline-none focus:border-amber-500 font-mono transition-all"
            />
          </div>

          {authError && (
            <div className="text-xs text-rose-600 font-medium">{authError}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Access Dashboard
          </button>

          <p className="text-[11px] text-stone-500">
            For demonstration and testing, enter default PIN: <strong>1234</strong>
          </p>
        </form>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
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
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>View Public Menu</span>
          </button>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors"
        >
          Lock Dashboard
        </button>
      </div>

      {/* Header & Metric Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <span>Foodies Cafe Indri</span>
            <span>•</span>
            <span className="text-emerald-700">Owner Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
            Admin Dashboard
          </h1>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
          <div className="text-xs text-stone-500 font-medium">Pending Orders</div>
          <div className="text-2xl font-extrabold text-amber-600 tabular-nums">{activeOrdersCount}</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
          <div className="text-xs text-stone-500 font-medium">Total Orders</div>
          <div className="text-2xl font-extrabold text-stone-900 tabular-nums">{orders.length}</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
          <div className="text-xs text-stone-500 font-medium">Gross Revenue</div>
          <div className="text-2xl font-extrabold text-emerald-700 tabular-nums">{formatCurrency(totalRevenue)}</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1">
          <div className="text-xs text-stone-500 font-medium">Menu Dishes</div>
          <div className="text-2xl font-extrabold text-stone-800 tabular-nums">{menu.length}</div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setAdminTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            adminTab === 'orders'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management</span>
          {activeOrdersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-300 text-[10px] font-extrabold flex items-center justify-center">
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('menu')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            adminTab === 'menu'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Menu & Pricing</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            adminTab === 'settings'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Store & Delivery Settings</span>
        </button>

        <button
          onClick={() => setAdminTab('coupons')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            adminTab === 'coupons'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Coupons & Offers</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-600">Filter:</span>
              <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
                {(['active', 'completed', 'cancelled', 'all'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                      orderFilter === f
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-stone-500">
              Showing {filteredOrders.length} orders
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-xs text-stone-500 shadow-sm">
              No orders found under this filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-amber-700 font-mono">
                        {order.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        order.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : order.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-stone-500 capitalize">
                        • {order.fulfillment}
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xs text-stone-500">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-base font-extrabold text-stone-900 tabular-nums">
                        {formatCurrency(order.grandTotal)}
                      </div>
                    </div>
                  </div>

                  {/* Customer and Items Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-stone-500 font-semibold">Customer Details:</span>
                      <div className="font-bold text-stone-900 text-sm">{order.customer.name}</div>
                      <div className="font-mono text-stone-700">Phone: +91 {order.customer.phone}</div>
                      {order.address && (
                        <div className="text-stone-600 mt-1">
                          Delivery: {order.address.street}, {order.address.locality}
                        </div>
                      )}
                      {order.specialInstructions && (
                        <div className="text-amber-800 italic">
                          Special Note: "{order.specialInstructions}"
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-stone-500 font-semibold">Items Ordered:</span>
                      <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="flex justify-between text-stone-700">
                            <span>{i.quantity} × {i.name}</span>
                            <span className="tabular-nums font-semibold text-stone-900">
                              {formatCurrency(i.price * i.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Action Buttons for Owner */}
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-stone-600 mr-2">Update Status:</span>

                      {order.status === 'received' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-300 text-sky-800 text-xs font-bold hover:bg-sky-100"
                        >
                          Confirm Order
                        </button>
                      )}

                      {(order.status === 'received' || order.status === 'confirmed') && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-100"
                        >
                          Mark Preparing
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() =>
                            onUpdateOrderStatus(
                              order.id,
                              order.fulfillment === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery'
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-300 text-purple-800 text-xs font-bold hover:bg-purple-100"
                        >
                          {order.fulfillment === 'pickup' ? 'Mark Ready for Pickup' : 'Send Out for Delivery'}
                        </button>
                      )}

                      {(order.status === 'out_for_delivery' || order.status === 'ready_for_pickup') && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-extrabold shadow-xs"
                        >
                          Mark Completed
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const reason = prompt('Cancellation reason:', 'Customer requested / Out of stock');
                          if (reason) onUpdateOrderStatus(order.id, 'cancelled', reason);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 text-xs font-medium hover:bg-rose-100 ml-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MENU & PRICING MANAGEMENT */}
      {adminTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-stone-900">Cafe Menu Editor</h2>
              <p className="text-xs text-stone-500">
                Add, edit prices, toggle item availability, or customize descriptions. Changes immediately update the live store.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openCreateModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Reset menu back to initial sample items?')) onResetMenu();
                }}
                className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 hover:text-stone-900 shadow-2xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Sample Menu</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-sm flex items-center justify-center border text-[8px] font-bold ${
                          item.isVeg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'
                        }`}>
                          ●
                        </span>
                        <h3 className="text-sm font-bold text-stone-900">{item.name}</h3>
                      </div>
                      <span className="text-[11px] text-amber-700 font-semibold">{item.category}</span>
                    </div>

                    <span className="text-sm font-bold text-stone-900 tabular-nums">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onUpdateMenuItem(item.id, { isAvailable: !item.isAvailable })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      item.isAvailable
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}
                  >
                    {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      aria-label="Edit item"
                      className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.name}"?`)) onDeleteMenuItem(item.id);
                      }}
                      aria-label="Delete item"
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STORE & DELIVERY SETTINGS */}
      {adminTab === 'settings' && (
        <form onSubmit={handleSaveSettingsForm} className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900">Cafe Operations & Delivery Rules</h2>
              <p className="text-xs text-stone-500">Configure fees, times, and announcement text.</p>
            </div>
            {settingsSavedMsg && (
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">Min Order Amount (₹)</label>
              <input
                type="number"
                min="0"
                value={settingsForm.minOrderAmount}
                onChange={(e) => setSettingsForm({ ...settingsForm, minOrderAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                min="0"
                value={settingsForm.standardDeliveryFee}
                onChange={(e) => setSettingsForm({ ...settingsForm, standardDeliveryFee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">Free Delivery Above (₹)</label>
              <input
                type="number"
                min="0"
                value={settingsForm.freeDeliveryThreshold}
                onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 block">Est Prep Time (Minutes)</label>
              <input
                type="number"
                min="5"
                value={settingsForm.prepTimeMinutes}
                onChange={(e) => setSettingsForm({ ...settingsForm, prepTimeMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 block">Top Announcement Bar Text</label>
            <input
              type="text"
              value={settingsForm.announcement}
              onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700 block">Delivery Zones in Indri (Comma separated)</label>
            <textarea
              rows={3}
              value={settingsForm.deliveryZones.join(', ')}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  deliveryZones: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </form>
      )}

      {/* TAB 4: COUPONS & OFFERS */}
      {adminTab === 'coupons' && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900">Create New Coupon</h2>
            
            <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="CODE (e.g. CAFE20)"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 uppercase font-bold"
                />
              </div>

              <div>
                <select
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <input
                  type="number"
                  min="1"
                  required
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(Number(e.target.value))}
                  placeholder="Discount Value"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">Active Coupons</h3>
            <div className="divide-y divide-stone-100 bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
              {coupons.map((c) => (
                <div key={c.code} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-amber-700 font-mono text-sm">{c.code}</div>
                    <div className="text-stone-500">{c.description} • Min Order: {formatCurrency(c.minOrder)}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCouponActive(c.code)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        c.active ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-stone-100 text-stone-500 border border-stone-200'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT EDIT / CREATE MODAL */}
      {(editingItem || isCreatingNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-stone-200 shadow-xl rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-stone-900">
                {isCreatingNew ? 'Add New Product' : `Edit: ${editingItem?.name}`}
              </h3>
              <button
                onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900"
                  >
                    {['Pizza', 'Burgers', 'Sandwiches', 'Pasta', 'Momos & Snacks', 'Beverages'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Food Item Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={itemForm.imageUrl || ''}
                  onChange={(e) => setItemForm({ ...itemForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none"
                />
                {itemForm.imageUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-stone-50 rounded-xl border border-stone-200">
                    <img
                      src={itemForm.imageUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <span className="text-[11px] text-stone-600">Image preview</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isVeg}
                    onChange={(e) => setItemForm({ ...itemForm, isVeg: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <span>100% Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isBestseller}
                    onChange={(e) => setItemForm({ ...itemForm, isBestseller: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <span>Mark Bestseller</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isAvailable}
                    onChange={(e) => setItemForm({ ...itemForm, isAvailable: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <span>Available in Stock</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsCreatingNew(false); }}
                  className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
