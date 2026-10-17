import React from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink } from 'lucide-react';
import { StoreSettings } from '../types';

interface FooterProps {
  settings: StoreSettings;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, setActiveTab }) => {
  return (
    <footer className="bg-[#f4efe6] text-stone-700 border-t border-stone-200/90 pt-14 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-300/60">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                FC
              </div>
              <span className="text-xl font-extrabold text-stone-900 tracking-tight">Foodies Cafe</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              Your favourite neighborhood cafe in Indri, Haryana. Crafting fresh artisanal pizzas, gourmet burgers, pasta, crispy snacks, and signature thick cold coffees.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/foodiescafe_indri/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-stone-300/80 hover:border-pink-400 text-xs text-stone-800 hover:text-pink-600 shadow-xs transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>@foodiescafe_indri</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">Quick Navigation</h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors"
                >
                  Home & Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors"
                >
                  Explore Digital Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors"
                >
                  Order Online (Delivery & Pickup)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors"
                >
                  About Our Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors"
                >
                  Location & Contact Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-700 transition-colors text-amber-700 font-semibold"
                >
                  Owner Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-900 font-semibold">Monday – Friday</div>
                  <div className="text-xs text-stone-600">10:30 AM – 10:30 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-900 font-semibold">Saturday & Sunday</div>
                  <div className="text-xs text-stone-600">10:00 AM – 11:00 PM</div>
                </div>
              </div>
            </div>
            <div className="pt-2 text-xs text-stone-600 border-t border-stone-300/60">
              <span className="text-amber-700 font-semibold">Delivery Zones:</span> Indri Town, Khukhani, New Bazaar, Grain Market & adjacent localities.
            </div>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">Reach Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-stone-700">
                  {settings.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-stone-800 hover:text-amber-700 font-medium transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Foodies%20Cafe,%20I%20would%20like%20to%20order`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Foodies Cafe, Indri, Haryana. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-stone-500">
            * Sample items & prices displayed are placeholders and can be customized by the cafe owner anytime in the Admin Dashboard.
          </p>
        </div>
      </div>
    </footer>
  );
};
