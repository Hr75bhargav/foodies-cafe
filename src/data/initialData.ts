import { MenuItem, StoreSettings, Coupon } from '../types';

export const INITIAL_MENU: MenuItem[] = [
  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 129,
    description: 'Classic stone-baked pizza loaded with 100% mozzarella cheese, fresh basil leaves, and slow-simmered Italian tomato passata.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular (7-inch)', price: 0 },
      { name: 'Medium (9-inch)', price: 70 },
      { name: 'Large (12-inch)', price: 140 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst Crust', price: 50 },
      { name: 'Thin & Crispy Wheat Crust', price: 30 }
    ],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 35 },
      { name: 'Spicy Jalapenos & Olives', price: 25 },
      { name: 'Fresh Paneer Cubes', price: 35 }
    ]
  },
  {
    id: 'pizza-2',
    name: 'Farm Fresh Pizza',
    category: 'Pizza',
    price: 179,
    description: 'Crisp green bell peppers, sweet golden corn, red onions, ripe tomatoes, and black olives over melted cheese.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular (7-inch)', price: 0 },
      { name: 'Medium (9-inch)', price: 70 },
      { name: 'Large (12-inch)', price: 140 }
    ],
    crusts: [
      { name: 'Classic Hand Tossed', price: 0 },
      { name: 'Cheese Burst Crust', price: 50 }
    ],
    addons: [
      { name: 'Extra Mozzarella Cheese', price: 35 },
      { name: 'Fresh Mushroom Slices', price: 30 }
    ]
  },
  {
    id: 'pizza-3',
    name: 'Cheese Burst Pizza',
    category: 'Pizza',
    price: 229,
    description: 'Double layered crust filled with molten flowing cheese, seasoned with Italian herbs and generous mozzarella topping.',
    isVeg: true,
    isNew: true,
    isAvailable: true,
    foodType: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Regular (7-inch)', price: 0 },
      { name: 'Medium (9-inch)', price: 80 },
      { name: 'Large (12-inch)', price: 150 }
    ],
    crusts: [
      { name: 'Cheese Burst Crust', price: 0 }
    ],
    addons: [
      { name: 'Extra Cheese Dip', price: 25 },
      { name: 'Peri Peri Seasoning', price: 15 }
    ]
  },

  // Burgers
  {
    id: 'burger-1',
    name: 'Classic Veg Burger',
    category: 'Burgers',
    price: 79,
    description: 'Crisp golden spiced potato & vegetable patty, fresh crunchy iceberg lettuce, tomato slices, and cafe special creamy mayo in toasted buns.',
    isVeg: true,
    isAvailable: true,
    foodType: 'burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Single Patty', price: 0 },
      { name: 'Double Patty', price: 40 }
    ],
    addons: [
      { name: 'Add Melted Cheese Slice', price: 20 },
      { name: 'Add Peri Peri Fries combo', price: 59 }
    ]
  },
  {
    id: 'burger-2',
    name: 'Cheese Burger',
    category: 'Burgers',
    price: 109,
    description: 'Juicy spiced burger layered with real cheddar cheese slice, caramelized onions, house tangy secret sauce, and lettuce.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'burger',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Single Patty', price: 0 },
      { name: 'Double Patty & Extra Cheese', price: 50 }
    ],
    addons: [
      { name: 'Extra Cheese Slice', price: 20 },
      { name: 'Add Dip & Beverage Combo', price: 69 }
    ]
  },

  // Sandwiches
  {
    id: 'sandwich-1',
    name: 'Veg Grilled Sandwich',
    category: 'Sandwiches',
    price: 89,
    description: 'Freshly buttered bread stuffed with spiced potatoes, cucumber, tomatoes, onions, mint chutney, and grilled to crispy perfection.',
    isVeg: true,
    isAvailable: true,
    foodType: 'sandwich',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Add Cheese Slice', price: 20 },
      { name: 'Extra Mint Chutney & Dip', price: 15 }
    ]
  },
  {
    id: 'sandwich-2',
    name: 'Cheese Sandwich',
    category: 'Sandwiches',
    price: 109,
    description: 'Triple-decker grilled sandwich packed with gooey melted cheese, chopped bell peppers, sweet corn, and oregano herb sprinkle.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'sandwich',
    imageUrl: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Extra Mozzarella Layer', price: 25 },
      { name: 'Add Garlic Herb Butter', price: 15 }
    ]
  },

  // Pasta
  {
    id: 'pasta-1',
    name: 'White Sauce Pasta',
    category: 'Pasta',
    price: 149,
    description: 'Penne pasta tossed in velvety garlic-infused Alfredo white sauce, sauteed sweet corn, mushrooms, and cracked black pepper.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'pasta',
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Extra Cheese Melt', price: 30 },
      { name: 'Garlic Bread (2 pcs)', price: 45 }
    ]
  },
  {
    id: 'pasta-2',
    name: 'Red Sauce Pasta',
    category: 'Pasta',
    price: 139,
    description: 'Tuscan Arrabbiata red sauce pasta cooked with roasted garlic, ripe Roma tomatoes, crushed red chili flakes, and fresh basil.',
    isVeg: true,
    isAvailable: true,
    foodType: 'pasta',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Add Mozzarella Cheese', price: 25 },
      { name: 'Garlic Bread (2 pcs)', price: 45 }
    ]
  },

  // Momos & Snacks
  {
    id: 'momo-1',
    name: 'Steamed Veg Momos',
    category: 'Momos & Snacks',
    price: 79,
    description: '6 pieces of delicate steamed dumplings filled with freshly grated cabbage, carrots, onions, and mild spices. Served with fiery Schezwan chutney.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'momos',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Upgrade to Gravy Momos', price: 30 },
      { name: 'Extra Spicy Dip', price: 15 }
    ]
  },
  {
    id: 'momo-2',
    name: 'Fried Momos',
    category: 'Momos & Snacks',
    price: 99,
    description: '6 pieces of golden crunchy fried dumplings served piping hot with signature spicy red garlic dip and creamy mayo.',
    isVeg: true,
    isAvailable: true,
    foodType: 'momos',
    imageUrl: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Kurkure Momos Coating', price: 25 },
      { name: 'Extra Mayo Dip', price: 15 }
    ]
  },
  {
    id: 'snack-1',
    name: 'French Fries',
    category: 'Momos & Snacks',
    price: 79,
    description: 'Crispy salted golden french fries served with gourmet tomato ketchup and mayonnaise dip.',
    isVeg: true,
    isAvailable: true,
    foodType: 'fries',
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Add Melted Cheese Dip', price: 25 }
    ]
  },
  {
    id: 'snack-2',
    name: 'Peri Peri Fries',
    category: 'Momos & Snacks',
    price: 99,
    description: 'Hot crispy potato fries tossed in zesty, zippy South African peri-peri spice dust. An irresistible cafe favourite.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'fries',
    imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    addons: [
      { name: 'Extra Peri Peri Masala', price: 10 },
      { name: 'Cheesy Jalapeno Dip', price: 25 }
    ]
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 89,
    description: 'Thick, creamy chilled espresso blend churned with whole milk and vanilla ice cream, swirled with rich Hershey\'s chocolate syrup.',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    foodType: 'coffee',
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Standard (300ml)', price: 0 },
      { name: 'Large Frappe (450ml)', price: 30 }
    ],
    addons: [
      { name: 'Scoop of Vanilla Ice Cream', price: 25 },
      { name: 'Extra Chocolate Drizzle', price: 15 }
    ]
  },
  {
    id: 'bev-2',
    name: 'Chocolate Shake',
    category: 'Beverages',
    price: 119,
    description: 'Decadent chocolate milkshake made with real dark cocoa, creamy milk, and chocolate chip crunch on top.',
    isVeg: true,
    isAvailable: true,
    foodType: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Standard (300ml)', price: 0 },
      { name: 'Thick Freak Shake (450ml)', price: 40 }
    ],
    addons: [
      { name: 'Crushed Oreo Sprinkles', price: 20 },
      { name: 'Whipped Cream', price: 20 }
    ]
  },
  {
    id: 'bev-3',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 59,
    description: 'Refreshing fizzy soda blended with freshly hand-squeezed yellow lemon juice, black salt, and roasted cumin (sweet or salted).',
    isVeg: true,
    isAvailable: true,
    foodType: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    sizes: [
      { name: 'Sweet & Salty Mix', price: 0 },
      { name: 'Pure Sweet', price: 0 },
      { name: 'Salted & Spiced', price: 0 }
    ]
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Foodies Cafe',
  phone: '+91 84275 25253',
  whatsappNumber: '918427525253',
  address: 'Near Vishavkarma Mandir, New Bazaar, Khukhani, Indri, Haryana 132041',
  googleMapsUrl: 'https://maps.google.com/?q=Near+Vishavkarma+Mandir+New+Bazaar+Khukhani+Indri+Haryana+132041',
  instagramHandle: 'foodiescafe_indri',
  isOpen: true,
  prepTimeMinutes: 20,
  deliveryTimeMinutes: 35,
  announcement: '🛵 10 KM FREE DELIVERY on orders above ₹299! Call +91 84275 25253 | Use code FOODIE10 for 10% OFF',
  announcementActive: true,
  minOrderAmount: 99,
  standardDeliveryFee: 30,
  freeDeliveryThreshold: 299,
  deliveryZones: [
    'New Bazaar, Indri',
    'Khukhani, Indri',
    'Near Vishavkarma Mandir',
    'Main Bazaar, Indri',
    'Grain Market (Anaj Mandi)',
    'Karnal Road, Indri',
    'Ladwa Road, Indri',
    'Model Town, Indri',
    'Court Complex & Sub-Tehsil',
    'G.T. Road Link Area'
  ],
  openingHours: [
    { days: 'Monday – Friday', time: '10:30 AM – 10:30 PM' },
    { days: 'Saturday – Sunday', time: '10:00 AM – 11:00 PM' }
  ]
};

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FOODIE10',
    type: 'percentage',
    value: 10,
    minOrder: 149,
    description: '10% off on all orders above ₹149',
    active: true
  },
  {
    code: 'WELCOME50',
    type: 'fixed',
    value: 50,
    minOrder: 299,
    description: 'Flat ₹50 discount on orders above ₹299',
    active: true
  },
  {
    code: 'INDRIFREE',
    type: 'fixed',
    value: 30,
    minOrder: 199,
    description: '₹30 off (free delivery equivalent) on orders above ₹199',
    active: true
  }
];

export const INITIAL_ORDERS: import('../types').Order[] = [
  {
    id: 'FC-1082',
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    customer: {
      name: 'Sahil Sharma',
      phone: '9812345678',
      email: 'sahil.indri@gmail.com'
    },
    fulfillment: 'delivery',
    address: {
      street: 'H.No 12, Ward 4, Near Girls School',
      locality: 'New Bazaar, Indri',
      landmark: 'Near Vishavkarma Mandir',
      pincode: '132041'
    },
    items: [
      {
        id: 'c-demo-1',
        productId: 'pizza-2',
        name: 'Farm Fresh Pizza',
        price: 179,
        quantity: 1,
        selectedSize: { name: 'Medium (9-inch)', price: 70 },
        selectedCrust: { name: 'Classic Hand Tossed', price: 0 },
        selectedAddons: [{ name: 'Extra Mozzarella Cheese', price: 35 }]
      },
      {
        id: 'c-demo-2',
        productId: 'bev-1',
        name: 'Cold Coffee',
        price: 89,
        quantity: 2
      }
    ],
    subtotal: 462,
    discount: 46,
    couponCode: 'FOODIE10',
    deliveryFee: 0,
    tax: 21,
    grandTotal: 437,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'preparing',
    statusHistory: [
      { status: 'received', timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(), note: 'Order placed by customer' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 38 * 60 * 1000).toISOString(), note: 'Cafe confirmed order' },
      { status: 'preparing', timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), note: 'Chef preparing fresh pizzas & drinks' }
    ],
    specialInstructions: 'Please make crust extra crispy and send extra oregano packets.'
  },
  {
    id: 'FC-1081',
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    customer: {
      name: 'Ritu Chaudhary',
      phone: '8427525253'
    },
    fulfillment: 'pickup',
    items: [
      {
        id: 'c-demo-3',
        productId: 'burger-2',
        name: 'Cheese Burger',
        price: 109,
        quantity: 2
      },
      {
        id: 'c-demo-4',
        productId: 'snack-2',
        name: 'Peri Peri Fries',
        price: 99,
        quantity: 1
      }
    ],
    subtotal: 317,
    discount: 0,
    deliveryFee: 0,
    tax: 16,
    grandTotal: 333,
    paymentMethod: 'cop',
    paymentStatus: 'paid',
    status: 'completed',
    statusHistory: [
      { status: 'received', timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString() },
      { status: 'confirmed', timestamp: new Date(Date.now() - 105 * 60 * 1000).toISOString() },
      { status: 'preparing', timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString() },
      { status: 'ready_for_pickup', timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString() },
      { status: 'completed', timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(), note: 'Customer picked up order at cafe' }
    ]
  }
];
