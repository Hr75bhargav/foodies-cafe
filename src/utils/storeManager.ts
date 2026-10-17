import { MenuItem, Order, StoreSettings, Coupon, OrderStatus } from '../types';
import { INITIAL_MENU, INITIAL_SETTINGS, INITIAL_COUPONS, INITIAL_ORDERS } from '../data/initialData';

const MENU_KEY = 'foodies_cafe_menu_v2';
const ORDERS_KEY = 'foodies_cafe_orders_v1';
const SETTINGS_KEY = 'foodies_cafe_settings_v2';
const COUPONS_KEY = 'foodies_cafe_coupons_v1';

export class CafeStore {
  // In-memory cache
  private static menu: MenuItem[] | null = null;
  private static orders: Order[] | null = null;
  private static settings: StoreSettings | null = null;
  private static coupons: Coupon[] | null = null;

  // Listeners for reactive updates
  private static listeners: Set<() => void> = new Set();

  public static subscribe(listener: () => void): () => void {
    CafeStore.listeners.add(listener);
    return () => {
      CafeStore.listeners.delete(listener);
    };
  }

  private static notify() {
    CafeStore.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Store listener error:', err);
      }
    });
  }

  // ---- MENU ----
  public static getMenu(): MenuItem[] {
    if (CafeStore.menu) return CafeStore.menu;
    try {
      const stored = localStorage.getItem(MENU_KEY) || localStorage.getItem('foodies_cafe_menu_v1');
      if (stored) {
        const parsed: MenuItem[] = JSON.parse(stored);
        // Enrich any items missing imageUrl from INITIAL_MENU
        const enriched = parsed.map((item) => {
          if (!item.imageUrl) {
            const initial = INITIAL_MENU.find((m) => m.id === item.id);
            if (initial?.imageUrl) {
              return { ...item, imageUrl: initial.imageUrl };
            }
          }
          return item;
        });
        CafeStore.menu = enriched;
        CafeStore.saveMenu(enriched);
        return CafeStore.menu;
      }
    } catch {
      // fallback
    }
    CafeStore.menu = [...INITIAL_MENU];
    CafeStore.saveMenu(CafeStore.menu);
    return CafeStore.menu;
  }

  public static saveMenu(menu: MenuItem[]) {
    CafeStore.menu = menu;
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(menu));
    } catch {
      // localStorage error fallback
    }
    CafeStore.notify();
  }

  public static addMenuItem(item: MenuItem) {
    const current = CafeStore.getMenu();
    const updated = [item, ...current];
    CafeStore.saveMenu(updated);
  }

  public static updateMenuItem(id: string, updates: Partial<MenuItem>) {
    const current = CafeStore.getMenu();
    const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
    CafeStore.saveMenu(updated);
  }

  public static deleteMenuItem(id: string) {
    const current = CafeStore.getMenu();
    const updated = current.filter((item) => item.id !== id);
    CafeStore.saveMenu(updated);
  }

  public static resetMenuToDefault() {
    CafeStore.saveMenu([...INITIAL_MENU]);
  }

  // ---- ORDERS ----
  public static getOrders(): Order[] {
    if (CafeStore.orders) return CafeStore.orders;
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      if (stored) {
        CafeStore.orders = JSON.parse(stored);
        return CafeStore.orders!;
      }
    } catch {
      // fallback
    }
    CafeStore.orders = [...INITIAL_ORDERS];
    CafeStore.saveOrders(CafeStore.orders);
    return CafeStore.orders;
  }

  public static saveOrders(orders: Order[]) {
    CafeStore.orders = orders;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // localStorage error fallback
    }
    CafeStore.notify();
  }

  public static createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'statusHistory'>): Order {
    const current = CafeStore.getOrders();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `FC-${randomNum}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: now,
      status: 'received',
      statusHistory: [
        {
          status: 'received',
          timestamp: now,
          note: 'Order successfully received at Foodies Cafe.'
        }
      ]
    };

    const updated = [newOrder, ...current];
    CafeStore.saveOrders(updated);
    return newOrder;
  }

  public static getOrderById(id: string): Order | undefined {
    const orders = CafeStore.getOrders();
    return orders.find((o) => o.id.toLowerCase() === id.toLowerCase().trim());
  }

  public static updateOrderStatus(id: string, newStatus: OrderStatus, note?: string): boolean {
    const orders = CafeStore.getOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return false;

    const now = new Date().toISOString();
    order.status = newStatus;
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status: newStatus,
      timestamp: now,
      note: note || `Order updated to ${newStatus.replace(/_/g, ' ')}`
    });

    if (newStatus === 'completed' && order.paymentMethod === 'cop') {
      order.paymentStatus = 'paid';
    }

    CafeStore.saveOrders([...orders]);
    return true;
  }

  public static cancelOrder(id: string, reason: string): boolean {
    const orders = CafeStore.getOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) return false;

    // Cafe cancellation rule: only cancel if not already out for delivery or completed
    if (order.status === 'out_for_delivery' || order.status === 'completed') {
      return false;
    }

    const now = new Date().toISOString();
    order.status = 'cancelled';
    order.cancellationReason = reason;
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: now,
      note: `Cancelled: ${reason}`
    });

    CafeStore.saveOrders([...orders]);
    return true;
  }

  // ---- STORE SETTINGS ----
  public static getSettings(): StoreSettings {
    if (CafeStore.settings) return CafeStore.settings;
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        CafeStore.settings = JSON.parse(stored);
        return CafeStore.settings!;
      }
    } catch {
      // fallback
    }
    CafeStore.settings = { ...INITIAL_SETTINGS };
    CafeStore.saveSettings(CafeStore.settings);
    return CafeStore.settings;
  }

  public static saveSettings(settings: StoreSettings) {
    CafeStore.settings = settings;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // fallback
    }
    CafeStore.notify();
  }

  // ---- COUPONS ----
  public static getCoupons(): Coupon[] {
    if (CafeStore.coupons) return CafeStore.coupons;
    try {
      const stored = localStorage.getItem(COUPONS_KEY);
      if (stored) {
        CafeStore.coupons = JSON.parse(stored);
        return CafeStore.coupons!;
      }
    } catch {
      // fallback
    }
    CafeStore.coupons = [...INITIAL_COUPONS];
    CafeStore.saveCoupons(CafeStore.coupons);
    return CafeStore.coupons;
  }

  public static saveCoupons(coupons: Coupon[]) {
    CafeStore.coupons = coupons;
    try {
      localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
    } catch {
      // fallback
    }
    CafeStore.notify();
  }

  public static applyCouponCode(code: string, subtotal: number): { success: boolean; coupon?: Coupon; error?: string } {
    const cleanCode = code.trim().toUpperCase();
    const coupons = CafeStore.getCoupons();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, error: 'Invalid coupon code or expired.' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        error: `Minimum order of ₹${found.minOrder} required for ${found.code}. Add more items!`
      };
    }

    return { success: true, coupon: found };
  }
}
