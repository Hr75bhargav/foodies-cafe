import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Bike,
  Store,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  Home
} from 'lucide-react';
import { StoreSettings } from '../types';
import { formatCurrency } from '../utils/cartCalculations';

interface ContactPageProps {
  settings: StoreSettings;
  setActiveTab?: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSent, setContactSent] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const faqs = [
    {
      q: 'Do you offer Cash on Delivery (COD) in Indri?',
      a: 'Yes, Cash on Delivery is available across all serviceable delivery zones in Indri, including New Bazaar, Khukhani, Model Town, and central Indri.'
    },
    {
      q: 'What is the minimum order amount for delivery?',
      a: `The minimum order amount for home delivery is ${formatCurrency(settings.minOrderAmount)}. Delivery is completely FREE for orders above ${formatCurrency(settings.freeDeliveryThreshold)}!`
    },
    {
      q: 'How does Self Pickup work?',
      a: `Simply choose "Self Pickup" during checkout. There is ₹0 delivery charge. Your order will be prepared fresh in approximately ${settings.prepTimeMinutes} minutes. You can pay cash or UPI at the counter when collecting.`
    },
    {
      q: 'Can I cancel an order after placing it?',
      a: 'Orders can be cancelled via the online tracking screen if the kitchen has not yet started preparing or dispatched the order. For immediate assistance, please call us directly at +91 84275 25253.'
    },
    {
      q: 'Where is Foodies Cafe located?',
      a: 'We are situated Near Vishavkarma Mandir, in New Bazaar, Khukhani, Indri, Haryana 132041. Drop by for takeaways or enjoy doorstep delivery.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10 sm:space-y-16 pb-24">
      
      {/* Prominent Back to Home Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 p-3 sm:p-3.5 rounded-2xl border border-amber-200 shadow-xs">
        <button
          onClick={() => {
            if (setActiveTab) setActiveTab('home');
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

      {/* Title */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Get in Touch</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Contact, Delivery & Pickup
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
          Find our cafe in Indri, check delivery areas, and reach our team for orders or support.
        </p>
      </div>

      {/* Grid: Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone / Call */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Call Us Directly</h3>
            <p className="text-xs text-stone-500">For phone orders and urgent order questions.</p>
            <div className="text-base font-extrabold text-amber-700 pt-1">
              {settings.phone}
            </div>
          </div>
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold text-center block shadow-xs transition-colors"
          >
            Click to Call Now
          </a>
        </div>

        {/* WhatsApp Chat */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">WhatsApp Business</h3>
            <p className="text-xs text-stone-500">Message us for quick orders or location directions.</p>
            <div className="text-xs font-mono font-bold text-emerald-700 pt-1">
              +91 84275 25253
            </div>
          </div>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Foodies%20Cafe,%20I%20have%20an%20enquiry`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold text-center block transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Cafe Address */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Visit Our Counter</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {settings.address}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              PIN: 132041 • Indri, Haryana
            </div>
          </div>
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold text-center block border border-stone-200 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>

      </div>

      {/* Service Policies & Timings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Operating Hours & Delivery Policy (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Operating Hours Table */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-stone-900">Cafe Timings & Operating Hours</h2>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {settings.openingHours.map((h, i) => (
                <div key={i} className="py-2.5 flex justify-between">
                  <span className="text-stone-600 font-medium">{h.days}</span>
                  <span className="text-stone-900 font-bold">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Currently <strong>Open for Orders</strong> in Indri!</span>
            </div>
          </div>

          {/* Delivery Coverage Areas & Fees */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Bike className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-stone-900">Delivery Rates & Service Zones</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Standard Delivery Fee</span>
                <span className="text-sm font-bold text-stone-900">{formatCurrency(settings.standardDeliveryFee)}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Free Delivery Threshold</span>
                <span className="text-sm font-bold text-emerald-700">{formatCurrency(settings.freeDeliveryThreshold)}+</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-stone-700 block">Serviceable Localities in Indri (PIN 132041):</span>
              <div className="flex flex-wrap gap-1.5">
                {settings.deliveryZones.map((zone) => (
                  <span
                    key={zone}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-[11px] text-stone-700 font-medium"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right: Contact Form (6 Cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Send Us a Message</h2>
            <p className="text-xs text-stone-500 mt-1">
              Have feedback, a custom bulk requirement, or a question? Drop a note below.
            </p>
          </div>

          {contactSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-stone-900">Message Sent Successfully!</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, {formName}! The Foodies Cafe management team will contact you back at +91 {formPhone}.
              </p>
              <button
                onClick={() => setContactSent(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Aman Saini"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Message or Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div className="max-w-3xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Ordering Queries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-stone-900 hover:text-amber-700"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
