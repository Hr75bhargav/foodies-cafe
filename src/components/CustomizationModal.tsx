import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CustomizationOption } from '../types';
import { formatCurrency } from '../utils/cartCalculations';
import { FoodArt } from './FoodArt';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (
    item: MenuItem,
    customization: {
      size?: CustomizationOption;
      crust?: CustomizationOption;
      addons?: CustomizationOption[];
      notes?: string;
    },
    quantity: number
  ) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onConfirm
}) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<CustomizationOption | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );
  const [selectedCrust, setSelectedCrust] = useState<CustomizationOption | undefined>(
    item.crusts && item.crusts.length > 0 ? item.crusts[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<CustomizationOption[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const toggleAddon = (addon: CustomizationOption) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  let unitPrice = item.price;
  if (selectedSize) unitPrice += selectedSize.price;
  if (selectedCrust) unitPrice += selectedCrust.price;
  selectedAddons.forEach((a) => (unitPrice += a.price));

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onConfirm(
      item,
      {
        size: selectedSize,
        crust: selectedCrust,
        addons: selectedAddons,
        notes: notes.trim() || undefined
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header / Graphic */}
        <div className="relative bg-[#f8f5ee] border-b border-stone-200 p-4 flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white border border-stone-200 shadow-xs">
            <FoodArt type={item.foodType} name={item.name} imageUrl={item.imageUrl} className="h-full w-full" />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border text-[9px] font-bold ${
                item.isVeg ? 'border-emerald-600 text-emerald-600' : 'border-rose-600 text-rose-600'
              }`}>
                ●
              </span>
              <h3 className="text-lg font-bold text-stone-900 truncate">{item.name}</h3>
            </div>
            <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">{item.description}</p>
            <div className="text-sm font-bold text-amber-700 mt-1">
              Base: {formatCurrency(item.price)}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close customization modal"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Options */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Size Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Choose Size</span>
                <span className="text-[11px] text-amber-700 font-semibold">Required (Choose 1)</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.sizes.map((s) => {
                  const isSelected = selectedSize?.name === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-stone-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-600 bg-amber-600' : 'border-stone-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-700">
                        {s.price === 0 ? 'Standard' : `+${formatCurrency(s.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selection */}
          {item.crusts && item.crusts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Choose Crust</span>
                <span className="text-[11px] text-amber-700 font-semibold">Choose 1</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.crusts.map((c) => {
                  const isSelected = selectedCrust?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCrust(c)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-stone-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-600 bg-amber-600' : 'border-stone-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-700">
                        {c.price === 0 ? 'Included' : `+${formatCurrency(c.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons / Extra Toppings */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Add-ons & Extras</span>
                <span className="text-[11px] text-stone-500">Optional</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.addons.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-stone-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-400'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-700">
                        +{formatCurrency(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
              Special Instructions for Chef
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra spicy, less salt, please cut into 6 slices"
              maxLength={120}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Footer Actions with Live Price and Quantity */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="text-stone-500 hover:text-stone-900 disabled:opacity-30 p-1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-stone-900 min-w-5 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="text-stone-500 hover:text-stone-900 p-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-extrabold">{formatCurrency(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
