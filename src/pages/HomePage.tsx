import { ArrowRight, Sparkles, Clock, ShieldCheck, HeartHandshake, Bike, Store, Instagram, ExternalLink, Star, Phone } from 'lucide-react';
import { MenuItem, StoreSettings } from '../types';
import { FoodArt } from '../components/FoodArt';
import { formatCurrency } from '../utils/cartCalculations';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  menu: MenuItem[];
  settings: StoreSettings;
  setActiveTab: (tab: string) => void;
  onOpenCustomization: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  menu,
  settings,
  setActiveTab,
  onOpenCustomization
}) => {
  const { addToCart } = useCart();

  const bestsellers = menu.filter((item) => item.isBestseller).slice(0, 6);

  const categories = [
    { name: 'Pizza', type: 'pizza', desc: 'Cheesy & Stone Baked' },
    { name: 'Burgers', type: 'burger', desc: 'Crispy Patties & Brioche' },
    { name: 'Sandwiches', type: 'sandwich', desc: 'Triple Layer Grilled' },
    { name: 'Pasta', type: 'pasta', desc: 'Velvety Alfredo & Red Sauce' },
    { name: 'Momos & Snacks', type: 'momos', desc: 'Steamed, Fried & Fries' },
    { name: 'Beverages', type: 'coffee', desc: 'Thick Shakes & Cold Coffee' },
  ];

  const combos = [
    {
      id: 'combo-1',
      title: 'Cheesy Treat Combo',
      desc: 'Farm Fresh Pizza (7") + Chilled Cold Coffee with chocolate drizzle',
      price: 249,
      originalPrice: 268,
      savings: 'Save ₹19',
      foodType: 'pizza'
    },
    {
      id: 'combo-2',
      title: 'Burger & Fries Feast',
      desc: 'Classic Cheese Burger + Peri Peri French Fries + Fresh Lime Soda',
      price: 239,
      originalPrice: 267,
      savings: 'Save ₹28',
      foodType: 'burger'
    },
    {
      id: 'combo-3',
      title: 'Momo & Pasta Duo',
      desc: 'Steamed Veg Momos (6 pcs) + Creamy White Sauce Pasta',
      price: 209,
      originalPrice: 228,
      savings: 'Save ₹19',
      foodType: 'momos'
    }
  ];

  const testimonials = [
    {
      name: 'Vikas Saini',
      locality: 'New Bazaar, Indri',
      review: 'The Cheese Burst Pizza and Cold Coffee from Foodies Cafe are hands down the best in Indri! Delivered hot and fresh.',
      rating: 5
    },
    {
      name: 'Anjali Sharma',
      locality: 'Model Town, Indri',
      review: 'Crispy Peri Peri Fries and White Sauce Pasta are our family favourites for evening snacks. Very clean and hygienic packaging.',
      rating: 5
    },
    {
      name: 'Gaurav Kamboj',
      locality: 'Khukhani Road, Indri',
      review: 'Super convenient for self pickup near Vishavkarma Mandir. The staff is polite, and the burgers are always loaded.',
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 lg:pb-24 border-b border-stone-200/80 bg-gradient-to-b from-[#fbf8f3] via-[#f7f3ea] to-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Taglines */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow-xs tracking-wide">
                  <Bike className="w-3.5 h-3.5 text-stone-950" />
                  <span>10 KM FREE DELIVERY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-700">
                    Call: {settings.phone}
                  </a>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] text-balance">
                Good Food. Great Mood. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  Welcome to Foodies Cafe.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-700 max-w-xl leading-relaxed">
                Your favourite cafe cravings, freshly prepared and delivered to your doorstep within 10 km in Indri. From molten cheese burst pizzas to thick chocolate shakes, taste true handcrafted goodness.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm shadow-xs transition-all"
                >
                  Explore Our Menu
                </button>

                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-4 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>Call to Order</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-stone-800">10 KM Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium">30–40 Mins Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium">Fresh Made-to-Order</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Food Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl bg-white border border-stone-200 p-4 shadow-xl">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#f4efe6] relative">
                  <FoodArt
                    type="pizza"
                    name="Farm Fresh Pizza"
                    imageUrl="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                    className="w-full h-full"
                    size="hero"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200 text-xs font-bold text-amber-700 shadow-xs">
                    Bestseller
                  </div>
                  <div className="absolute bottom-3 right-3 bg-stone-900/90 text-white backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-extrabold shadow-sm">
                    Starting ₹129
                  </div>
                </div>

                <div className="mt-4 p-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Artisanal Stone-Baked Pizzas</h3>
                    <p className="text-xs text-stone-500">Loaded with mozzarella & crisp vegetables</p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-2.5 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                    aria-label="Explore Pizzas"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Curated Offerings</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">Popular Categories</h2>
          </div>
          <button
            onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-4 rounded-xl bg-white hover:bg-amber-50/60 border border-stone-200 hover:border-amber-400 transition-all text-center group flex flex-col items-center justify-between h-44 shadow-2xs"
            >
              <div className="w-20 h-20 rounded-full bg-stone-100 p-2 group-hover:scale-105 transition-transform">
                <FoodArt type={cat.type} name={cat.name} className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BESTSELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Customer Favourites</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">Cafe Bestsellers</h2>
          </div>
          <span className="text-xs text-stone-500">
            Handcrafted with high quality ingredients
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-stone-200 overflow-hidden flex flex-col hover:border-stone-300 hover:shadow-md transition-all group shadow-2xs"
            >
              <div className="h-48 w-full bg-[#f6f2ea] relative">
                <FoodArt type={item.foodType} name={item.name} imageUrl={item.imageUrl} className="h-full w-full" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-2xs">
                    Bestseller
                  </span>
                  <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border text-[9px] font-bold bg-white ${
                    item.isVeg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'
                  }`}>
                    ●
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-base font-bold text-amber-700 tabular-nums">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100">
                  <span className="text-[11px] text-stone-500">
                    {item.sizes || item.crusts || item.addons ? 'Customizable' : 'Ready to serve'}
                  </span>
                  <button
                    onClick={() => {
                      if (item.sizes || item.crusts || item.addons) {
                        onOpenCustomization(item);
                      } else {
                        addToCart(item);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs active:scale-95 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIAL COMBOS & MEAL DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#fbf7f0] via-[#f7f2e8] to-[#f4eee2] border border-amber-300/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Value Meal Deals</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                Special Combo Offers
              </h2>
            </div>
            <span className="text-xs text-stone-600">Great value pairing your favourite eats & drinks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {combos.map((combo) => (
              <div
                key={combo.id}
                className="p-5 rounded-xl bg-white border border-stone-200/90 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {combo.savings}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      {formatCurrency(combo.originalPrice)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{combo.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{combo.desc}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <span className="text-base font-extrabold text-amber-700 tabular-nums">
                    {formatCurrency(combo.price)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart({
                        id: combo.id,
                        name: combo.title,
                        category: 'Pizza',
                        price: combo.price,
                        description: combo.desc,
                        isVeg: true,
                        isAvailable: true,
                        foodType: combo.foodType as any
                      });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                  >
                    Add Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE FOODIES CAFE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Pure Hospitality</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Why Indri Loves Foodies Cafe
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Committed to quality food, quick preparation, and friendly community service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-stone-900">Freshly Prepared</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every pizza base is stone-baked and every snack prepared fresh upon receiving your order.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-stone-900">Doorstep Delivery</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prompt delivery across New Bazaar, Khukhani, and all central localities in Indri.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-stone-900">Clean & Hygienic</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prepared in a sanitized kitchen adhering to strict food quality and hygiene standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-stone-900">Convenient Pickup</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Order online in advance and collect piping hot food without waiting in queues.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERY & TAKEAWAY INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 flex items-start gap-5 shadow-2xs">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Bike className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-stone-900">Doorstep Home Delivery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enjoy hot cafe cravings at home. Free delivery on orders above {formatCurrency(settings.freeDeliveryThreshold)}. Standard fee of {formatCurrency(settings.standardDeliveryFee)} for orders below threshold.
              </p>
              <div className="text-xs text-amber-800 font-bold pt-1">
                Estimated Delivery: {settings.deliveryTimeMinutes}–45 mins
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 flex items-start gap-5 shadow-2xs">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-stone-900">Express Self Pickup</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Drop by our cafe near Vishavkarma Mandir, New Bazaar. Order online, choose pickup, and pay with Cash on Pickup when your food is ready.
              </p>
              <div className="text-xs text-amber-800 font-bold pt-1">
                Estimated Ready: {settings.prepTimeMinutes} mins
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Local Love</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs text-stone-600">
            Feedback from customers in Indri enjoying our pizzas, snacks, and shakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs">
                <div className="font-bold text-stone-900">{t.name}</div>
                <div className="text-stone-500 text-[11px]">{t.locality}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600">
                <Instagram className="w-4 h-4" />
                <span>Follow Our Food Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                @foodiescafe_indri
              </h2>
            </div>
            <a
              href="https://www.instagram.com/foodiescafe_indri/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 text-xs font-bold transition-all shadow-xs"
            >
              <span>Visit Official Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            Catch behind-the-scenes pizza making, new menu teasers, customer stories, and daily food highlights directly on our official Instagram handle.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {['pizza', 'burger', 'pasta', 'coffee'].map((type, i) => (
              <a
                key={i}
                href="https://www.instagram.com/foodiescafe_indri/"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#f4efe6] border border-stone-200 hover:border-pink-500 transition-all flex items-center justify-center shadow-xs"
              >
                <FoodArt type={type} className="w-full h-full" />
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>View Post</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL ORDERING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-8 sm:p-12 text-stone-950 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Order Delicious Cafe Food?
            </h2>
            <p className="text-stone-900 text-xs sm:text-sm font-medium leading-relaxed">
              Order directly online for doorstep delivery or self-pickup in Indri. Apply coupon <strong>FOODIE10</strong> for 10% off!
            </p>
          </div>
          <button
            onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center gap-2.5 whitespace-nowrap"
          >
            <span>Order Now Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
