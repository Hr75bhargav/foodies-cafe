import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomizationModal } from './components/CustomizationModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderOnlinePage } from './pages/OrderOnlinePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Types & Store
import { MenuItem, Order, StoreSettings, Coupon, OrderStatus } from './types';
import { CafeStore } from './utils/storeManager';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [menu, setMenu] = useState<MenuItem[]>(() => CafeStore.getMenu());
  const [orders, setOrders] = useState<Order[]>(() => CafeStore.getOrders());
  const [settings, setSettings] = useState<StoreSettings>(() => CafeStore.getSettings());
  const [coupons, setCoupons] = useState<Coupon[]>(() => CafeStore.getCoupons());

  // Modal State for Customization
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const { addToCart, setIsCartOpen } = useCart();

  // Listen to store updates
  useEffect(() => {
    const unsub = CafeStore.subscribe(() => {
      setMenu(CafeStore.getMenu());
      setOrders(CafeStore.getOrders());
      setSettings(CafeStore.getSettings());
      setCoupons(CafeStore.getCoupons());
    });
    return unsub;
  }, []);

  const handleCustomizationConfirm = (
    item: MenuItem,
    customization: {
      size?: any;
      crust?: any;
      addons?: any[];
      notes?: string;
    },
    quantity: number
  ) => {
    addToCart(item, customization, quantity);
  };

  const handleOrderSuccess = (order: Order) => {
    setLastPlacedOrder(order);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans pb-16 md:pb-0">
      
      {/* Sticky Professional Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            menu={menu}
            settings={settings}
            setActiveTab={setActiveTab}
            onOpenCustomization={(item) => setCustomizingItem(item)}
          />
        )}

        {activeTab === 'menu' && (
          <MenuPage
            menu={menu}
            onOpenCustomization={(item) => setCustomizingItem(item)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'order' && (
          <OrderOnlinePage
            settings={settings}
            setActiveTab={setActiveTab}
            onOrderSuccess={handleOrderSuccess}
            createOrderAction={(data) => CafeStore.createOrder(data)}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            currentOrder={lastPlacedOrder || (orders.length > 0 ? orders[0] : null)}
            settings={settings}
            setActiveTab={setActiveTab}
            onSearchOrder={(id) => CafeStore.getOrderById(id)}
            onCancelOrder={(id, reason) => CafeStore.cancelOrder(id, reason)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            settings={settings}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            settings={settings}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPage
            menu={menu}
            orders={orders}
            settings={settings}
            coupons={coupons}
            onAddMenuItem={(item) => CafeStore.addMenuItem(item)}
            onUpdateMenuItem={(id, updates) => CafeStore.updateMenuItem(id, updates)}
            onDeleteMenuItem={(id) => CafeStore.deleteMenuItem(id)}
            onResetMenu={() => CafeStore.resetMenuToDefault()}
            onUpdateOrderStatus={(id, status, note) => CafeStore.updateOrderStatus(id, status, note)}
            onSaveSettings={(newSettings) => CafeStore.saveSettings(newSettings)}
            onSaveCoupons={(newCoupons) => CafeStore.saveCoupons(newCoupons)}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => {
          setActiveTab('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Customization Modal */}
      <CustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleCustomizationConfirm}
      />

      {/* Site Footer */}
      <Footer
        settings={settings}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
