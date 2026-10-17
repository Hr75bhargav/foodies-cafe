import React, { useState } from 'react';

interface FoodArtProps {
  type: string;
  name?: string;
  imageUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const FoodArt: React.FC<FoodArtProps> = ({
  type,
  name = '',
  imageUrl,
  className = '',
  size = 'md'
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // If a valid image URL is provided and has not failed, render it
  if (imageUrl && !imageFailed) {
    return (
      <div className={`relative overflow-hidden bg-[#f4efe6] ${className}`}>
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  // High-fidelity domain artwork with appetizing palettes on warm stone surfaces
  const renderGraphic = () => {
    switch (type.toLowerCase()) {
      case 'pizza':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            <circle cx="100" cy="100" r="82" fill="#c26315" stroke="#9a3412" strokeWidth="4" />
            <circle cx="100" cy="100" r="72" fill="#d97706" />
            <circle cx="100" cy="100" r="66" fill="#f59e0b" />
            {/* Melted Cheese Flow */}
            <path d="M60 70 Q90 60 120 75 Q150 90 140 120 Q125 150 95 140 Q60 130 60 70 Z" fill="#fbbf24" opacity="0.95" />
            {/* Bell Peppers & Veggies */}
            <rect x="75" y="75" width="22" height="7" rx="3" transform="rotate(-25 75 75)" fill="#15803d" />
            <rect x="110" y="85" width="20" height="7" rx="3" transform="rotate(35 110 85)" fill="#15803d" />
            <rect x="80" y="115" width="18" height="7" rx="3" transform="rotate(70 80 115)" fill="#dc2626" />
            <rect x="120" y="120" width="18" height="7" rx="3" transform="rotate(-40 120 120)" fill="#dc2626" />
            {/* Olives */}
            <circle cx="95" cy="95" r="7" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
            <circle cx="130" cy="100" r="6" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
            <circle cx="78" cy="100" r="6" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
            {/* Fresh Basil leaves */}
            <path d="M102 68 C105 58, 116 58, 118 68 C118 78, 108 78, 102 68 Z" fill="#16a34a" />
            <path d="M96 130 C90 138, 80 136, 82 126 C84 118, 94 122, 96 130 Z" fill="#16a34a" />
            {/* Oregano speckles */}
            <circle cx="90" cy="80" r="1.5" fill="#451a03" />
            <circle cx="108" cy="112" r="1.5" fill="#451a03" />
            <circle cx="115" cy="78" r="1.5" fill="#451a03" />
          </svg>
        );

      case 'burger':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Top Brioche Bun */}
            <path d="M48 90 C48 50, 152 50, 152 90 Z" fill="#d97706" />
            <path d="M52 86 C65 58, 135 58, 148 86 Z" fill="#f59e0b" />
            {/* Sesame Seeds */}
            <ellipse cx="85" cy="68" rx="2.5" ry="1.2" transform="rotate(-15 85 68)" fill="#fef3c7" />
            <ellipse cx="105" cy="62" rx="2.5" ry="1.2" transform="rotate(20 105 62)" fill="#fef3c7" />
            <ellipse cx="120" cy="72" rx="2.5" ry="1.2" transform="rotate(-10 120 72)" fill="#fef3c7" />
            <ellipse cx="70" cy="78" rx="2.5" ry="1.2" transform="rotate(25 70 78)" fill="#fef3c7" />
            {/* Crisp Lettuce */}
            <path d="M42 94 Q55 88 68 94 Q82 86 96 94 Q110 86 124 94 Q138 88 158 94 L154 100 L46 100 Z" fill="#22c55e" />
            {/* Red Tomato Slices */}
            <rect x="52" y="100" width="96" height="8" rx="4" fill="#dc2626" />
            {/* Melted Cheddar Slice */}
            <path d="M48 108 L152 108 L142 120 L118 114 L95 125 L75 112 L48 108 Z" fill="#fbbf24" />
            {/* Grilled Patty */}
            <rect x="50" y="114" width="100" height="18" rx="8" fill="#78350f" />
            {/* Bottom Bun */}
            <path d="M54 134 C54 148, 146 148, 146 134 Z" fill="#d97706" />
          </svg>
        );

      case 'sandwich':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Grilled Sandwich Triangle 1 */}
            <polygon points="45,145 155,145 100,55" fill="#b45309" />
            <polygon points="50,140 150,140 100,62" fill="#d97706" />
            {/* Grill Marks */}
            <line x1="72" y1="100" x2="128" y2="100" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="82" y1="80" x2="118" y2="80" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="62" y1="120" x2="138" y2="120" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            {/* Melty Cheese & Vegetable layers exposed at base */}
            <rect x="54" y="134" width="92" height="6" rx="3" fill="#fbbf24" />
            <rect x="65" y="138" width="70" height="4" rx="2" fill="#16a34a" />
            <rect x="75" y="132" width="50" height="3" rx="1.5" fill="#ef4444" />
          </svg>
        );

      case 'pasta':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Ceramic Pasta Bowl */}
            <ellipse cx="100" cy="115" rx="72" ry="48" fill="#3f3f46" stroke="#27272a" strokeWidth="3" />
            <ellipse cx="100" cy="110" rx="64" ry="40" fill="#fef3c7" />
            {/* Penne / Pasta Tubes */}
            <g fill="#fde68a" stroke="#d97706" strokeWidth="1.5">
              <rect x="70" y="90" width="28" height="12" rx="4" transform="rotate(-20 70 90)" />
              <rect x="102" y="85" width="30" height="12" rx="4" transform="rotate(15 102 85)" />
              <rect x="80" y="108" width="26" height="12" rx="4" transform="rotate(45 80 108)" />
              <rect x="110" y="110" width="28" height="12" rx="4" transform="rotate(-15 110 110)" />
              <rect x="65" y="115" width="25" height="11" rx="4" transform="rotate(-30 65 115)" />
            </g>
            {/* Creamy Sauce Gloss */}
            <path d="M72 105 Q100 88 128 105 Q100 125 72 105 Z" fill="#ffffff" opacity="0.6" />
            {/* Herbs & Basil */}
            <circle cx="95" cy="100" r="2" fill="#15803d" />
            <circle cx="118" cy="95" r="2" fill="#15803d" />
            <circle cx="85" cy="118" r="2" fill="#15803d" />
            <circle cx="105" cy="122" r="1.5" fill="#1c1917" />
            <circle cx="90" cy="92" r="1.5" fill="#1c1917" />
            <path d="M98 84 C96 74, 106 74, 108 84 C108 92, 100 92, 98 84 Z" fill="#22c55e" />
          </svg>
        );

      case 'momos':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Steamer Plate / Platter */}
            <circle cx="100" cy="100" r="74" fill="#d6cebe" stroke="#b8ad9b" strokeWidth="3" />
            {/* Momos Dumplings */}
            <g transform="translate(65, 60)">
              <ellipse cx="20" cy="20" rx="18" ry="14" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <path d="M8 16 Q20 8 32 16" stroke="#b45309" strokeWidth="2" fill="none" />
              <path d="M12 20 Q20 14 28 20" stroke="#b45309" strokeWidth="1.5" fill="none" />
            </g>
            <g transform="translate(100, 65)">
              <ellipse cx="20" cy="20" rx="18" ry="14" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <path d="M8 16 Q20 8 32 16" stroke="#b45309" strokeWidth="2" fill="none" />
            </g>
            <g transform="translate(55, 105)">
              <ellipse cx="20" cy="20" rx="18" ry="14" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
              <path d="M8 16 Q20 8 32 16" stroke="#78350f" strokeWidth="2" fill="none" />
            </g>
            <g transform="translate(95, 110)">
              <ellipse cx="20" cy="20" rx="18" ry="14" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <path d="M8 16 Q20 8 32 16" stroke="#b45309" strokeWidth="2" fill="none" />
            </g>
            {/* Spicy Red Chutney Bowl */}
            <circle cx="135" cy="100" r="16" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="135" cy="100" r="12" fill="#dc2626" />
            <circle cx="135" cy="98" r="4" fill="#ef4444" />
          </svg>
        );

      case 'fries':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Red Cafe Fry Box */}
            <polygon points="62,110 138,110 126,160 74,160" fill="#dc2626" />
            <polygon points="66,110 134,110 124,156 76,156" fill="#b91c1c" />
            {/* Golden Fries */}
            <g fill="#fbbf24" stroke="#d97706" strokeWidth="2">
              <rect x="76" y="52" width="10" height="65" rx="3" transform="rotate(-12 76 52)" />
              <rect x="92" y="46" width="10" height="70" rx="3" transform="rotate(2 92 46)" />
              <rect x="108" y="50" width="10" height="66" rx="3" transform="rotate(14 108 50)" />
              <rect x="84" y="65" width="10" height="52" rx="3" transform="rotate(-5 84 65)" />
              <rect x="100" y="62" width="10" height="55" rx="3" transform="rotate(8 100 62)" />
              <rect x="66" y="72" width="9" height="45" rx="3" transform="rotate(-22 66 72)" />
              <rect x="118" y="70" width="9" height="48" rx="3" transform="rotate(24 118 70)" />
            </g>
            {/* Peri Peri / Herb Sprinkles */}
            <circle cx="82" cy="70" r="1.5" fill="#ef4444" />
            <circle cx="98" cy="62" r="1.5" fill="#ef4444" />
            <circle cx="112" cy="75" r="1.5" fill="#ef4444" />
            <circle cx="90" cy="85" r="1.5" fill="#15803d" />
          </svg>
        );

      case 'coffee':
      case 'beverage':
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="92" fill="#ede5d8" />
            {/* Tall Chilled Glass */}
            <polygon points="72,60 128,60 120,150 80,150" fill="#e7ded0" opacity="0.9" />
            <polygon points="74,65 126,65 118,146 82,146" fill="#78350f" />
            {/* Chocolate Swirls */}
            <path d="M80 80 Q100 95 120 85 Q100 120 86 130" stroke="#451a03" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Whipped Cream Swirl */}
            <path d="M72 65 C72 45, 100 35, 100 50 C100 38, 128 42, 128 65 Z" fill="#ffffff" />
            <path d="M82 58 C90 48, 110 46, 118 58" stroke="#fef3c7" strokeWidth="3" fill="none" />
            {/* Cocoa Drizzle */}
            <path d="M88 48 Q98 42 108 50 Q115 54 120 60" stroke="#78350f" strokeWidth="2.5" fill="none" />
            {/* Straw */}
            <line x1="112" y1="28" x2="96" y2="105" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
            <line x1="112" y1="28" x2="96" y2="105" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
            {/* Ice Cubes */}
            <rect x="88" y="78" width="16" height="16" rx="3" fill="#ffffff" opacity="0.4" transform="rotate(12 88 78)" />
            <rect x="94" y="105" width="16" height="16" rx="3" fill="#ffffff" opacity="0.35" transform="rotate(-15 94 105)" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center p-4 bg-gradient-to-b from-[#fbf8f3] to-[#f2ece1] overflow-hidden rounded-t-xl ${className}`}>
      <div className="w-full max-w-[160px] aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {renderGraphic()}
      </div>
      {/* Subtle warm rim glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
