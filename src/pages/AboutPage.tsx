import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Users,
  UtensilsCrossed,
  Cake,
  Instagram,
  ArrowRight,
  ArrowLeft,
  Home,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { StoreSettings } from '../types';
import { FoodArt } from '../components/FoodArt';

interface AboutPageProps {
  settings: StoreSettings;
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, setActiveTab }) => {
  const [partyFormSent, setPartyFormSent] = useState(false);
  const [partyName, setPartyName] = useState('');
  const [partyPhone, setPartyPhone] = useState('');
  const [partyGuests, setPartyGuests] = useState('15');
  const [partyDate, setPartyDate] = useState('');

  const handlePartySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartyFormSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12 sm:space-y-18 pb-24">
      
      {/* Prominent Back to Home Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 p-3 sm:p-3.5 rounded-2xl border border-amber-200 shadow-xs">
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

        <span className="text-xs font-semibold text-amber-900 hidden sm:inline">
          Foodies Cafe • Indri, Haryana
        </span>
      </div>

      {/* Hero Brand Story Header */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-800">
          <Heart className="w-3.5 h-3.5 text-amber-600" />
          <span>Our Story & Passion for Food</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Crafting Flavourful Moments for Indri's Food Lovers.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          Welcome to <strong className="text-stone-900 font-extrabold">Foodies Cafe</strong>, located near Vishavkarma Mandir in the heart of New Bazaar, Indri. Born out of a deep love for gourmet fast food, cafe culture, and artisanal comfort meals, our kitchen is dedicated to serving hot, hygienic, and flavour-packed delicacies.
        </p>

        {/* Transparent Draft Copy Notice */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            * Note: Narrative copy reflects Foodies Cafe's brand mission and is editable by the cafe owner.
          </span>
        </div>
      </section>

      {/* Grid: Food Philosophy & Atmosphere */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Fresh Made-to-Order</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We never serve pre-made or stale food. Every pizza crust is stretched fresh, patties grilled hot, and momos steamed upon receiving your ticket.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Quality Ingredients</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From 100% real mozzarella cheese to rich cocoa syrups and farm-sourced vegetables, we focus on genuine taste without artificial shortcuts.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Local Community Spirit</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Proudly serving families, students, and professionals in Indri with welcoming cafe warmth, whether you are dining in, picking up, or ordering home.
          </p>
        </div>
      </section>

      {/* Visual Ambiance & Food Showcase Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Cafe Craft</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              A Taste of Foodies Cafe
            </h2>
          </div>
          <a
            href="https://www.instagram.com/foodiescafe_indri/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-pink-700 hover:text-pink-800"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Follow @foodiescafe_indri on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-60 rounded-2xl bg-white border border-stone-200 overflow-hidden relative group shadow-xs">
            <FoodArt type="pizza" name="Artisanal Pizza" className="h-full w-full" />
            <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs">
              Stone-Baked Pizza
            </div>
          </div>

          <div className="h-60 rounded-2xl bg-white border border-stone-200 overflow-hidden relative group shadow-xs">
            <FoodArt type="burger" name="Gourmet Burger" className="h-full w-full" />
            <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs">
              Crispy Burgers
            </div>
          </div>

          <div className="h-60 rounded-2xl bg-white border border-stone-200 overflow-hidden relative group shadow-xs">
            <FoodArt type="pasta" name="Creamy Pasta" className="h-full w-full" />
            <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs">
              White & Red Pasta
            </div>
          </div>

          <div className="h-60 rounded-2xl bg-white border border-stone-200 overflow-hidden relative group shadow-xs">
            <FoodArt type="coffee" name="Thick Cold Coffee" className="h-full w-full" />
            <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs">
              Signature Shakes
            </div>
          </div>
        </div>
      </section>

      {/* Birthday & Group Celebration Enquiries Section */}
      <section className="rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Cake className="w-4 h-4 text-amber-600" />
              <span>Celebrations & Bulk Orders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Host Your Birthday or Special Occasion With Us
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Planning a birthday party, family gathering, or office snack feast in Indri? Foodies Cafe offers customized party meal packages, bulk discounts, and comfortable cafe seating (subject to prior booking).
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Custom Combo Packages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Bulk Delivery Discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Decoration Support</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            {partyFormSent ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">Party Enquiry Received!</h3>
                <p className="text-xs text-stone-600">
                  Thank you! Our cafe team will call you shortly at +91 {partyPhone} to discuss arrangements and party pricing.
                </p>
                <button
                  onClick={() => setPartyFormSent(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartySubmit} className="space-y-3.5">
                <h3 className="text-sm font-bold text-stone-900">Book a Party / Group Order</h3>
                
                <div>
                  <input
                    type="text"
                    required
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={partyPhone}
                    onChange={(e) => setPartyPhone(e.target.value)}
                    placeholder="Mobile Number (+91)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={partyGuests}
                    onChange={(e) => setPartyGuests(e.target.value)}
                    placeholder="Guests Count"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                  />
                  <input
                    type="date"
                    required
                    value={partyDate}
                    onChange={(e) => setPartyDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Send Celebration Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Bottom CTA to Order Online */}
      <section className="text-center space-y-4 pt-4">
        <h2 className="text-2xl font-extrabold text-stone-900">Ready to Enjoy Foodies Cafe?</h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Skip the wait. Place your takeaway or home delivery order online in just a few clicks.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
