import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Cpu, 
  Heart,
  User,
  ShoppingCart,
  Search,
  MenuIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

// Import local product images
import aegisPro from '/productImages/aegispro.png';
import mouse1 from '/productImages/mouse.png';
import mouse2 from '/productImages/mouse2.png';
import mouse3 from '/productImages/mouse3.png';
import aegis3dLayered from '/productImages/aegis3dlayered.png';
import aegisBack from '/productImages/aegisBack.png';
import aegisHands from '/productImages/aegishands.png';
import monitorMain from '/productImages/monitorMain.png';
import monitor2 from '/productImages/monitor2.png';
import monitor3 from '/productImages/monitor3.png';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  model: string;
  limited: boolean;
  pieces: number | null;
  color?: string;
}

interface Variant {
  id: number;
  image: string;
  color?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Aegis Pro",
    category: "Mechanical Keyboard",
    description: "Ultra-low latency mechanical keyboard with custom switches",
    price: "$899",
    image: aegisPro,
    model: "KB-371SR-BK",
    limited: true,
    pieces: 50,
    color: "bg-blue-900"
  },
  {
    id: 2,
    name: "Aegis Pro",
    category: "Mechanical Keyboard",
    description: "Premium build quality with aluminum frame construction",
    price: "$899",
    image: aegisBack,
    model: "KB-371SR-BK",
    limited: true,
    pieces: 50,
    color: "bg-indigo-900"
  },
  {
    id: 3,
    name: "Aegis Pro",
    category: "Mechanical Keyboard",
    description: "Ergonomic design for comfortable typing experience",
    price: "$899",
    image: aegisHands,
    model: "KB-371SR-BK",
    limited: true,
    pieces: 50,
    color: "bg-violet-900"
  },
  {
    id: 4,
    name: "Aegis Pro",
    category: "Mechanical Keyboard",
    description: "Multi-layer construction with hot-swappable switches",
    price: "$899",
    image: aegis3dLayered,
    model: "KB-371SR-BK",
    limited: true,
    pieces: 50,
    color: "bg-purple-900"
  },
  {
    id: 5,
    name: "Nova Specter",
    category: "Gaming Mouse",
    description: "Ultra-precise 16K DPI optical sensor with zero latency",
    price: "$299",
    image: mouse1,
    model: "MS-371SR-BK",
    limited: false,
    pieces: null,
    color: "bg-amber-900"
  },
  {
    id: 6,
    name: "Nova Specter",
    category: "Gaming Mouse",
    description: "Ergonomic design with 8 programmable buttons",
    price: "$299",
    image: mouse2,
    model: "MS-371SR-BK",
    limited: false,
    pieces: null,
    color: "bg-orange-900"
  },
  {
    id: 7,
    name: "Nova Specter",
    category: "Gaming Mouse",
    description: "RGB lighting with 16.8 million customizable colors",
    price: "$299",
    image: mouse3,
    model: "MS-371SR-BK",
    limited: false,
    pieces: null,
    color: "bg-red-900"
  },
  {
    id: 8,
    name: "Quantum Display",
    category: "Ultra-wide Monitor",
    description: "49-inch curved 5K display with 240Hz refresh rate",
    price: "$1,499",
    image: monitorMain,
    model: "QD-490-5K",
    limited: true,
    pieces: 35,
    color: "bg-cyan-900"
  },
  {
    id: 9,
    name: "Quantum Display",
    category: "Ultra-wide Monitor",
    description: "HDR 1000 with quantum dot technology for true-to-life colors",
    price: "$1,499",
    image: monitor2,
    model: "QD-490-5K",
    limited: true,
    pieces: 35,
    color: "bg-blue-900"
  },
  {
    id: 10,
    name: "Quantum Display",
    category: "Ultra-wide Monitor",
    description: "Adaptive sync technology for seamless gaming experience",
    price: "$1,499",
    image: monitor3,
    model: "QD-490-5K",
    limited: true,
    pieces: 35,
    color: "bg-emerald-900"
  }
];

const variants: Variant[] = [
  { id: 1, image: aegisPro, color: "bg-blue-500" },
  { id: 2, image: aegisBack, color: "bg-indigo-500" },
  { id: 3, image: aegisHands, color: "bg-violet-500" },
  { id: 4, image: aegis3dLayered, color: "bg-purple-500" },
  { id: 5, image: mouse1, color: "bg-amber-500" },
  { id: 6, image: mouse2, color: "bg-orange-500" },
  { id: 7, image: mouse3, color: "bg-red-500" },
  { id: 8, image: monitorMain, color: "bg-cyan-500" },
  { id: 9, image: monitor2, color: "bg-blue-500" },
  { id: 10, image: monitor3, color: "bg-emerald-500" },
];

const Products: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [previousProduct, setPreviousProduct] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [animating, setAnimating] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [cardBgOpacity, setCardBgOpacity] = useState<'light' | 'medium' | 'dark' | 'black'>('medium');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("keyboards");
  const [activePage, setActivePage] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const autoChangeRef = useRef<boolean>(true);
  
  const categories = [
    "KEYBOARD - FRONT",
    "KEYBOARD - BACK",
    "KEYBOARD - HANDS",
    "KEYBOARD - LAYERS",
    "MOUSE - FRONT",
    "MOUSE - SIDE",
    "MOUSE - TOP",
    "MONITOR - FRONT",
    "MONITOR - SIDE",
    "MONITOR - REAR"
  ];

  const productCategories = [
    { id: "keyboards", name: "KEYBOARDS", icon: <Keyboard className="w-4 h-4" /> },
    { id: "mice", name: "MICE", icon: <Mouse className="w-4 h-4" /> },
    { id: "monitors", name: "MONITORS", icon: <Monitor className="w-4 h-4" /> }
  ];

  // Define sizes for filters
  const sizes = ['34', '37', '40', '41', '42', '43', '44+', '45'];
  
  // Define materials for filters
  const materials = [
    { name: 'Red Gold', color: 'bg-red-400' },
    { name: 'Silver', color: 'bg-gray-300' },
    { name: 'Blue', color: 'bg-blue-400' },
    { name: 'Black', color: 'bg-black' },
    { name: 'Red', color: 'bg-red-600' }
  ];

  // Group products by category
  const keyboardProducts = products.slice(0, 4);
  const mouseProducts = products.slice(4, 7);
  const monitorProducts = products.slice(7, 10);

  // Function to get current display products
  const getCurrentProducts = () => {
    switch(activeCategory) {
      case "keyboards": return keyboardProducts;
      case "mice": return mouseProducts;
      case "monitors": return monitorProducts;
      default: return keyboardProducts;
    }
  };

  const changeProduct = (newIndex: number) => {
    if (animating) return;
    
    setAnimating(true);
    setPreviousProduct(activeProduct);
    
    // Determine direction based on indices
    if (newIndex === 0 && activeProduct === products.length - 1) {
      setDirection('right');
    } else if (newIndex === products.length - 1 && activeProduct === 0) {
      setDirection('left');
    } else {
      setDirection(newIndex > activeProduct ? 'right' : 'left');
    }
    
    setActiveProduct(newIndex);
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 800);
  };
  
  const nextCategory = () => {
    setCategoryIndex((prev) => (prev + 1) % categories.length);
  };
  
  const prevCategory = () => {
    setCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };
  
  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e) {
      touchStartXRef.current = e.touches[0].clientX;
    } else {
      touchStartXRef.current = e.clientX;
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartXRef.current) return;
    
    let touchEndX;
    if ('changedTouches' in e) {
      touchEndX = e.changedTouches[0].clientX;
    } else {
      touchEndX = e.clientX;
    }
    
    const touchDiff = touchEndX - touchStartXRef.current;
    
    if (Math.abs(touchDiff) > 50) {      
      autoChangeRef.current = false;
      
      // Change products based on swipe direction
      if (touchDiff > 0) {
        // Left swipe - previous product
        const newIndex = (activeProduct - 1 + products.length) % products.length;
        changeProduct(newIndex);
      } else {
        // Right swipe - next product
        const newIndex = (activeProduct + 1) % products.length;
        changeProduct(newIndex);
      }
    }
    
    touchStartXRef.current = null;
  };
  
  // Left area click handler
  const handleLeftClick = () => {
    autoChangeRef.current = false;
    const newIndex = (activeProduct - 1 + products.length) % products.length;
    changeProduct(newIndex);
  };
  
  // Right area click handler
  const handleRightClick = () => {
    autoChangeRef.current = false;
    const newIndex = (activeProduct + 1) % products.length;
    changeProduct(newIndex);
  };
  
  useEffect(() => {
    // Auto rotate products
    const interval = setInterval(() => {
      if (autoChangeRef.current && !animating) {
        const newIndex = (activeProduct + 1) % products.length;
        changeProduct(newIndex);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeProduct, animating]);
  
  // Get current product data
  const currentProduct = products[activeProduct];
  const isAegisProduct = activeProduct < 4;
  const isNovaProduct = activeProduct >= 4 && activeProduct < 7;
  const isQuantumDisplay = activeProduct >= 7;

  // Function to determine card background opacity
  const getCardBgClass = () => {
    return 'bg-black/30';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background blur with tint of the current product - OUTSIDE the card only */}
      <div className="absolute inset-0 z-0">
        <img 
          src={products[activeProduct].image} 
          alt="Background"
          className="w-full h-full object-cover opacity-50 blur-xl scale-110"
        />
        <div className={`absolute inset-0 ${currentProduct.color || 'bg-black/60'} opacity-40 mix-blend-overlay`}></div>
      </div>

      {/* Main Card Section */}
      <div className="relative z-10 w-full max-w-[95%] lg:max-w-[92%] xl:max-w-[90%] mx-auto px-2 py-2 md:py-3 lg:py-4 flex items-center justify-center min-h-[95vh]">
        <div 
          ref={cardRef}
          className={`card-container rounded-3xl overflow-hidden backdrop-blur-md ${getCardBgClass()} border border-gray-800/50 shadow-2xl transition-all duration-300 hover:border-amber-500/30 w-full max-h-[95vh] md:max-h-[90vh] flex flex-col`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {/* Navigation */}
          <div className="border-b border-gray-800/30 relative z-10 flex-shrink-0">
            <div className="px-4 sm:px-6 md:px-10 py-4 md:py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-12">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white">QUANTUMRIG</h1>
                  <MenuIcon className="w-6 h-6 text-white md:hidden" />
                  <div className="hidden md:flex space-x-6 lg:space-x-12">
                    <Link to="/home" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add page transition animation class to body
                        document.body.classList.add('page-transition');
                        
                        // Add overlay element
                        const overlay = document.createElement('div');
                        overlay.className = 'fixed inset-0 bg-black z-50 page-overlay';
                        document.body.appendChild(overlay);
                        
                        // Clone current card and position it for animation
                        if (cardRef.current) {
                          const rect = cardRef.current.getBoundingClientRect();
                          const clone = cardRef.current.cloneNode(true) as HTMLElement;
                          clone.style.position = 'fixed';
                          clone.style.top = `${rect.top}px`;
                          clone.style.left = `${rect.left}px`;
                          clone.style.width = `${rect.width}px`;
                          clone.style.height = `${rect.height}px`;
                          clone.style.zIndex = '60';
                          clone.style.transition = 'all 0.5s ease-in-out';
                          clone.style.transform = 'scale(1)';
                          clone.className += ' card-clone';
                          document.body.appendChild(clone);
                          
                          // Animate the clone out
                          setTimeout(() => {
                            clone.style.transform = 'scale(0.9) translateY(30px)';
                            clone.style.opacity = '0';
                            
                            // Navigate after animation completes
                            setTimeout(() => {
                              window.location.href = '/home';
                            }, 500);
                          }, 100);
                        } else {
                          // Fallback if card ref not available
                          setTimeout(() => {
                            window.location.href = '/home';
                          }, 600);
                        }
                      }}
                    >HOME</Link>
                    <Link to="/products" className="text-white transition-colors border-b border-amber-500 pb-1">PRODUCTS</Link>
                    <Link to="/watches" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add page transition animation class to body
                        document.body.classList.add('page-transition');
                        
                        // Add overlay element
                        const overlay = document.createElement('div');
                        overlay.className = 'fixed inset-0 bg-black z-50 page-overlay';
                        document.body.appendChild(overlay);
                        
                        // Clone current card and position it for animation
                        if (cardRef.current) {
                          const rect = cardRef.current.getBoundingClientRect();
                          const clone = cardRef.current.cloneNode(true) as HTMLElement;
                          clone.style.position = 'fixed';
                          clone.style.top = `${rect.top}px`;
                          clone.style.left = `${rect.left}px`;
                          clone.style.width = `${rect.width}px`;
                          clone.style.height = `${rect.height}px`;
                          clone.style.zIndex = '60';
                          clone.style.transition = 'all 0.5s ease-in-out';
                          clone.style.transform = 'scale(1)';
                          clone.className += ' card-clone';
                          document.body.appendChild(clone);
                          
                          // Animate the clone out
                          setTimeout(() => {
                            clone.style.transform = 'scale(1.1) translateY(-30px)';
                            clone.style.opacity = '0';
                            
                            // Navigate after animation completes
                            setTimeout(() => {
                              window.location.href = '/watches';
                            }, 500);
                          }, 100);
                        } else {
                          // Fallback if card ref not available
                          setTimeout(() => {
                            window.location.href = '/watches';
                          }, 600);
                        }
                      }}
                    >WATCHES</Link>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">WARRANTY & SERVICE</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">STORES</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-6">
                  <button className="bg-gray-800 text-white px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded-md">EUR</button>
                  <button className="bg-gray-800 text-white px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded-md">ENG</button>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-white hover:text-red-400 transition-colors" />
                  <User className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-white hover:text-blue-400 transition-colors" />
                  <div className="relative">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-white hover:text-blue-400 transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-800/30 relative z-10 flex-shrink-0">
            <div className="flex flex-wrap justify-between items-center">
              {/* Functions / Categories */}
              <div className="mb-0">
                <div className="text-gray-400 text-xs uppercase mb-1">Functions</div>
                <div className="flex items-center space-x-2">
                  {productCategories.map((category) => (
                    <button 
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full flex items-center justify-center p-2 ${activeCategory === category.id ? 'bg-amber-500 text-white' : 'bg-gray-800 text-gray-400'} transition-colors duration-300`}
                    >
                      {category.icon}
                    </button>
                  ))}
                  <div className="border border-gray-700 h-5 mx-1" />
                  <div className="flex items-center bg-gray-800/50 rounded-full px-3 py-1">
                    <span className="text-white text-xs">FEATURES</span>
                    <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <div className="text-gray-400 text-xs uppercase mb-1">Sizes</div>
                <div className="flex items-center space-x-1">
                  {sizes.map(size => (
                    <div 
                      key={size} 
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Materials */}
              <div>
                <div className="text-gray-400 text-xs uppercase mb-1">Materials <span className="text-amber-500">RED</span></div>
                <div className="flex items-center space-x-1">
                  {materials.map((material, index) => (
                    <div 
                      key={index} 
                      className={`w-6 h-6 rounded-full ${material.color} cursor-pointer hover:ring hover:ring-white/30 transition-all duration-300`}
                    />
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <button className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors duration-300">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Display Area */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 relative z-10 flex-grow overflow-y-auto">
            {/* Product Category Title */}
            <div className="mb-3 sm:mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wider">
                {activeCategory === "keyboards" ? "AEGIS PRO" : 
                 activeCategory === "mice" ? "NOVA SPECTER" : "QUANTUM DISPLAY"}
              </h2>
              <div className="mt-1 flex items-center">
                <div className="flex space-x-1">
                  {Array(10).fill(0).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-1 rounded-full ${i === activePage - 1 ? 'bg-amber-500' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
                <div className="ml-auto flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {getCurrentProducts().map((product, index) => (
                <div 
                  key={index} 
                  className="bg-black/40 rounded-2xl overflow-hidden group cursor-pointer product-card" 
                  style={{"--card-index": index} as React.CSSProperties}
                >
                  <div className="p-2 relative">
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full text-xs text-amber-500">
                      LIMITED TO {product.pieces || 100} PIECES
                    </div>
                    <div className="h-40 sm:h-48 md:h-52 flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-800/30 text-center">
                    <div className="text-xs text-gray-400">{product.model}</div>
                    <div className="text-white text-sm mt-0.5">{activeCategory === "keyboards" ? "AEGIS PRO" : 
                      activeCategory === "mice" ? "NOVA SPECTER" : "QUANTUM DISPLAY"}</div>
                    <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.description.slice(0, 40)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom navigation */}
          <div className={`${getCardBgClass()} backdrop-blur-xl p-2 sm:p-3 border-t border-gray-800/30 relative z-10 flex-shrink-0`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-white text-xs font-medium">
                  PAGE {activePage} OF 3
                </span>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-400 hover:text-white transition-colors text-xs">
                  VIEW ALL <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 