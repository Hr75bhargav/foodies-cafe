import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, ShoppingBag, AlertCircle, Info, ArrowLeft, Home } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { FoodArt } from '../components/FoodArt';
import { formatCurrency } from '../utils/cartCalculations';
import { useCart } from '../context/CartContext';

interface MenuPageProps {
  menu: MenuItem[];
  onOpenCustomization: (item: MenuItem) => void;
  setActiveTab: (tab: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  menu,
  onOpenCustomization,
  setActiveTab
}) => {
  const { addToCart, totalItemsCount, totals, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');

  const categories: MenuCategory[] = [
    'All',
    'Pizza',
    'Burgers',
    'Sandwiches',
    'Pasta',
    'Momos & Snacks',
    'Beverages'
  ];

  const filteredItems = useMemo(() => {
    return menu
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (
          searchQuery &&
          !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Veg only filter
        if (vegOnly && !item.isVeg) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
        }
        return 0;
      });
  }, [menu, selectedCategory, searchQuery, vegOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8 pb-28">
      
      {/* Prominent Back to Home Banner (Visible on mobile & desktop) */}
      <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 p-3 sm:p-3.5 rounded-2xl border border-amber-200 shadow-xs">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all"
          aria-label="Back to Home page"
        >
          <ArrowLeft className="w-4 h-4 text-stone-950" />
          <Home className="w-4 h-4 text-stone-950" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-900">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-200/90 text-amber-950 font-black text-[11px] shadow-2xs">
            🛵 10 KM Free Delivery (₹299+)
          </span>
          <a
            href="tel:+918427525253"
            className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-amber-300 text-stone-900 hover:text-amber-700 font-bold text-[11px]"
          >
            <span>📞 +91 84275 25253</span>
          </a>
        </div>
      </div>

      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Fresh & Handcrafted</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Our Digital Menu
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Prepared to order using premium cheeses, fresh farm vegetables, and signature cafe sauces.
          </p>
        </div>

        {/* Transparent Sample Menu Disclaimer Notice */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Menu Note:</strong> Sample items and prices are illustrative placeholders. All items, prices, and availability are fully editable by the cafe owner in the Admin Dashboard.
          </span>
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pizza, burger, momos, shake..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Toggles & Sorting */}
        <div className="flex items-center gap-3">
          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-3 h-3 rounded-sm border border-emerald-600 flex items-center justify-center text-[8px] text-emerald-600 font-bold">
              ●
            </span>
            <span>Veg Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-stone-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="default">Featured</option>
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
          <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-900">No dishes found</h3>
          <p className="text-xs text-stone-500">
            Try adjusting your search query or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setVegOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-stone-100 text-xs font-semibold text-stone-800 hover:bg-stone-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasCustomizations = (item.sizes && item.sizes.length > 0) || (item.crusts && item.crusts.length > 0) || (item.addons && item.addons.length > 0);

            return (
              <div
                key={item.id}
                className={`rounded-2xl bg-white border border-stone-200 overflow-hidden flex flex-col justify-between transition-all group shadow-2xs ${
                  !item.isAvailable ? 'opacity-60' : 'hover:border-stone-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Food Art & Badges */}
                  <div className="h-44 w-full bg-[#f6f2ea] relative">
                    <FoodArt type={item.foodType} name={item.name} imageUrl={item.imageUrl} className="h-full w-full" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border text-[9px] font-bold bg-white ${
                        item.isVeg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'
                      }`}>
                        ●
                      </span>
                      {item.isBestseller && (
                        <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-2xs">
                          Bestseller
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-sky-500 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-2xs">
                          New
                        </span>
                      )}
                    </div>

                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                        Currently Unavailable
                      </div>
                    )}
                  </div>

                  {/* Info Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-base font-extrabold text-amber-700 tabular-nums shrink-0">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-500">
                      {hasCustomizations ? 'Customizable options' : 'Standard serving'}
                    </span>

                    {item.isAvailable ? (
                      <button
                        onClick={() => {
                          if (hasCustomizations) {
                            onOpenCustomization(item);
                          } else {
                            addToCart(item);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{hasCustomizations ? 'Customize' : 'Add'}</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-400 text-xs font-medium cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Cart Bar for Quick Order on Mobile/Desktop */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 max-w-xl mx-auto z-40 animate-in slide-in-from-bottom duration-200">
          <div className="bg-white border border-amber-300 rounded-2xl p-3 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                {totalItemsCount}
              </div>
              <div>
                <div className="text-xs text-stone-500">{totalItemsCount === 1 ? '1 item in cart' : `${totalItemsCount} items in cart`}</div>
                <div className="text-sm font-extrabold text-stone-900 tabular-nums">{formatCurrency(totals.grandTotal)}</div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>View Cart</span>
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
