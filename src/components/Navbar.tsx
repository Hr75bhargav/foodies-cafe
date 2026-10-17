import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  Clock,
  Sparkles,
  ArrowLeft,
  Home,
  Utensils,
  ShoppingCart,
  HelpCircle,
  Bike,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/cartCalculations';
import { StoreSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: StoreSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, settings }) => {
  const { totalItemsCount, totals, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order Online' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Owner Admin' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
        {/* TOP CONTACT INFO & 10KM FREE DELIVERY TAGLINE (Always on top) */}
        <div className="bg-stone-900 text-stone-100 border-b border-stone-800 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            {/* 10km Free Delivery Tagline */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wide shadow-2xs">
                <Bike className="w-3.5 h-3.5 text-stone-950" />
                10 KM FREE DELIVERY
              </span>
              <span className="text-stone-300 font-medium hidden sm:inline">
                Free home delivery within 10 km on all orders above ₹299 in Indri!
              </span>
              <span className="text-stone-300 font-medium sm:hidden text-[10px]">
                Free within 10 km (₹299+)
              </span>
            </div>

            {/* Contact Info: Direct Call + WhatsApp + Location */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-stone-300 ml-auto sm:ml-0">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
                title="Call Foodies Cafe"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-white hover:text-amber-300 font-bold">{settings.phone}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Foodies%20Cafe,%20I%20would%20like%20to%20order%20food!`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xs:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-[11px]"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <span className="hidden md:flex items-center gap-1 text-stone-400 text-[11px]">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Khukhani, Indri</span>
              </span>

              <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Open 10:30 AM – 10:30 PM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        {settings.announcementActive && settings.announcement && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 px-4 py-1 text-center text-[11px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-4xl">{settings.announcement}</span>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-8">
          
          {/* Zone 1: Brand wordmark & Prominent Back to Home button on mobile & desktop */}
          <div className="flex items-center gap-2 sm:gap-3">
            {activeTab !== 'home' && (
              <button
                onClick={() => handleNavClick('home')}
                title="Return to Home page"
                aria-label="Return to Home page"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all shadow-2xs active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-amber-700" />
                <span className="inline font-bold">Home</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-3 text-left group shrink-0 focus:outline-none"
              aria-label="Foodies Cafe Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
                FC
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                  Foodies Cafe
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 -mt-0.5 tracking-wider">
                  INDRI, HARYANA
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  activeTab === link.id
                    ? 'text-amber-600 font-bold'
                    : 'hover:text-stone-900 text-stone-600'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Shopping Cart & Order Trigger) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all whitespace-nowrap"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-stone-950 text-amber-300 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span>
                {totalItemsCount === 0 ? 'Cart' : formatCurrency(totals.grandTotal)}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header Breadcrumb when not on home */}
        {activeTab !== 'home' && (
          <div className="md:hidden bg-amber-50/90 border-t border-amber-200/60 px-4 py-1.5 flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-1.5 font-bold text-amber-800 hover:text-amber-950"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Home Page</span>
            </button>
            <span className="text-[11px] font-medium text-stone-500 capitalize">
              Viewing: {activeTab === 'order' ? 'Order Online' : activeTab}
            </span>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200/50'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span>{link.label}</span>
                {activeTab === link.id && <span className="w-2 h-2 rounded-full bg-amber-500" />}
              </button>
            ))}
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2 text-xs text-stone-500 px-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>10:30 AM – 10:30 PM (Daily)</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Navigation Bar (App-like mobile experience) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-stone-200 py-2 px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-around"
      >
        {/* 1. Home button */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-amber-600 font-bold scale-105'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-amber-600 stroke-[2.5]' : 'text-stone-500'}`} />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* 2. Menu button */}
        <button
          onClick={() => handleNavClick('menu')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'menu'
              ? 'text-amber-600 font-bold scale-105'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <Utensils className={`w-5 h-5 ${activeTab === 'menu' ? 'text-amber-600 stroke-[2.5]' : 'text-stone-500'}`} />
          <span className="text-[10px] mt-0.5">Menu</span>
        </button>

        {/* 3. Order button */}
        <button
          onClick={() => handleNavClick('order')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'order'
              ? 'text-amber-600 font-bold scale-105'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${activeTab === 'order' ? 'text-amber-600 stroke-[2.5]' : 'text-stone-500'}`} />
          <span className="text-[10px] mt-0.5">Order</span>
        </button>

        {/* 4. Cart trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-medium"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-stone-600" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-stone-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </button>

        {/* 5. Contact button */}
        <button
          onClick={() => handleNavClick('contact')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'contact'
              ? 'text-amber-600 font-bold scale-105'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <Phone className={`w-5 h-5 ${activeTab === 'contact' ? 'text-amber-600 stroke-[2.5]' : 'text-stone-500'}`} />
          <span className="text-[10px] mt-0.5">Contact</span>
        </button>
      </nav>
    </>
  );
};
