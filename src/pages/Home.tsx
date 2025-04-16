import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Keyboard, 
  Mouse, 
  Cpu, 
  Heart,
  User,
  ShoppingCart,
  MenuIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Import local Aegis Pro images
import aegisPro from '/productImages/aegispro.png';
import aegisBack from '/productImages/aegisBack.png';
import aegisHands from '/productImages/aegishands.png';
import aegis3dLayered from '/productImages/aegis3dlayered.png';
import mouse1 from '/productImages/mouse.png';
import mouse2 from '/productImages/mouse2.png';
import mouse3 from '/productImages/mouse3.png';
import monitorMain from '/productImages/monitorMain.png';
import monitor2 from '/productImages/monitor2.png';
import monitor3 from '/productImages/monitor3.png';
import pc1 from '/productImages/PC.png';
import pc2 from '/productImages/pcKit.png';
import pc3 from '/productImages/PCGPU.png';
import fullSystem from '/productImages/FullPC.png';

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

// Updated Aegis Pro with multiple views
const aegisProViews = [
  { id: 1, image: aegisPro, name: "Front View" },
  { id: 2, image: aegisBack, name: "Back View" },
  { id: 3, image: aegisHands, name: "Hands On" },
  { id: 4, image: aegis3dLayered, name: "Layered View" }
];

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
  },
  {
    id: 11,
    name: "Quantum Core",
    category: "Gaming PC",
    description: "High-performance gaming PC with RTX 4080, Intel i9, 64GB RAM",
    price: "$2,999",
    image: pc1,
    model: "QC-4080-i9",
    limited: true,
    pieces: 25,
    color: "bg-purple-900"
  },
  {
    id: 12,
    name: "Quantum Core",
    category: "Gaming PC",
    description: "Liquid-cooled system with custom loop and RGB lighting",
    price: "$2,999",
    image: pc2,
    model: "QC-4080-i9",
    limited: true,
    pieces: 25,
    color: "bg-blue-900"
  },
  {
    id: 13,
    name: "Quantum Core",
    category: "Gaming PC",
    description: "Premium build with tempered glass and aluminum chassis",
    price: "$2,999",
    image: pc3,
    model: "QC-4080-i9",
    limited: true,
    pieces: 25,
    color: "bg-indigo-900"
  },
  {
    id: 14,
    name: "Ultimate Setup",
    category: "Full System",
    description: "Complete gaming setup with PC, monitor, keyboard, and mouse",
    price: "$4,999",
    image: fullSystem,
    model: "QR-ULTIMATE",
    limited: true,
    pieces: 10,
    color: "bg-gray-900"
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

const Home: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [previousProduct, setPreviousProduct] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [animating, setAnimating] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [cardBgOpacity, setCardBgOpacity] = useState<'light' | 'medium' | 'dark' | 'black'>('medium');
  const autoChangeRef = useRef<boolean>(true);
  const touchStartXRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Function to determine card background opacity
  const getCardBgClass = () => {
    return 'bg-black/30';
  };
  
  // Function to handle product change with animation
  const changeProduct = (newIndex: number) => {
    if (animating) return;
    
    setAnimating(true);
    setPreviousProduct(activeProduct);
    
    // Determine direction based on indices
    // Account for wrapping case
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

  const handleWarrantyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.classList.add('page-transition');
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Add blur effect to current card content
      const blurOverlay = document.createElement('div');
      blurOverlay.className = 'card-content-blur';
      cardRef.current.appendChild(blurOverlay);
      
      // Create new card that will slide in
      const newCard = cardRef.current.cloneNode(true) as HTMLElement;
      newCard.style.position = 'fixed';
      newCard.style.top = `${-rect.height}px`; // Start from above the viewport
      newCard.style.left = `${rect.left}px`;
      newCard.style.width = `${rect.width}px`;
      newCard.style.height = `${rect.height}px`;
      newCard.style.zIndex = '60';
      newCard.className += ' card-clone card-clone-enter';
      document.body.appendChild(newCard);
      
      // Navigate after animation
      setTimeout(() => {
        // Clean up
        if (cardRef.current) {
          cardRef.current.removeChild(blurOverlay);
        }
        document.body.removeChild(newCard);
        document.body.classList.remove('page-transition');
        navigate('/warranty');
      }, 600);
    } else {
      // Fallback if card ref not available
      navigate('/warranty');
    }
  };

  // Function to get first product index for each category
  const getFirstProductIndex = (category: string) => {
    switch (category) {
      case 'keyboard':
        return 0; // Aegis Pro starts at index 0
      case 'mouse':
        return 4; // Nova Specter starts at index 4
      case 'monitor':
        return 7; // Quantum Display starts at index 7
      case 'pc':
        return 11; // Quantum Core starts at index 11
      default:
        return 0;
    }
  };

  // Function to handle category filter click
  const handleCategoryClick = (category: string) => {
    const targetIndex = getFirstProductIndex(category);
    if (targetIndex !== activeProduct) {
      changeProduct(targetIndex);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background blur with tint of the current product - OUTSIDE the card only */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentProduct.image} 
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
                    <Link to="/home" className="text-white transition-colors border-b border-amber-500 pb-1">HOME</Link>
                    <Link to="/products" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.body.classList.add('page-transition');
                        
                        if (cardRef.current) {
                          const rect = cardRef.current.getBoundingClientRect();
                          
                          // Add blur effect to current card content
                          const blurOverlay = document.createElement('div');
                          blurOverlay.className = 'card-content-blur';
                          cardRef.current.appendChild(blurOverlay);
                          
                          // Create new card that will slide in
                          const newCard = cardRef.current.cloneNode(true) as HTMLElement;
                          newCard.style.position = 'fixed';
                          newCard.style.top = `${-rect.height}px`; // Start from above the viewport
                          newCard.style.left = `${rect.left}px`;
                          newCard.style.width = `${rect.width}px`;
                          newCard.style.height = `${rect.height}px`;
                          newCard.style.zIndex = '60';
                          newCard.className += ' card-clone card-clone-enter';
                          document.body.appendChild(newCard);
                          
                          // Navigate after animation
                          setTimeout(() => {
                            // Clean up
                            if (cardRef.current) {
                              cardRef.current.removeChild(blurOverlay);
                            }
                            document.body.removeChild(newCard);
                            document.body.classList.remove('page-transition');
                            navigate('/products');
                          }, 600);
                        } else {
                          // Fallback if card ref not available
                          navigate('/products');
                        }
                      }}
                    >PRODUCTS</Link>
                    <Link to="/warranty" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={handleWarrantyClick}
                    >WARRANTY & SERVICE</Link>
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

          {/* Product Category Filters */}
          <div className="px-6 py-4 border-b border-gray-800/30">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button
                onClick={() => handleCategoryClick('keyboard')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProduct < 4 ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Keyboard className="w-4 h-4" />
                Keyboards
              </button>
              <button
                onClick={() => handleCategoryClick('mouse')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProduct >= 4 && activeProduct < 7 ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Mouse className="w-4 h-4" />
                Mice
              </button>
              <button
                onClick={() => handleCategoryClick('monitor')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProduct >= 7 && activeProduct < 11 ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Monitors
              </button>
              <button
                onClick={() => handleCategoryClick('pc')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeProduct >= 11 ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Cpu className="w-4 h-4" />
                PCs
              </button>
            </div>
          </div>

          {/* Main Product Display */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 flex-grow overflow-hidden flex flex-col">
            {/* Carousel Navigation Arrows */}
            <button 
              onClick={handleLeftClick}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={handleRightClick}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex-grow flex flex-col justify-between">
              {/* Product info tags */}
              <div className="absolute top-4 sm:top-8 md:top-12 left-4 sm:left-8 md:left-12 flex items-center space-x-2 z-10">
                <span className="text-xs sm:text-sm font-light text-white/70">{currentProduct.model}</span>
                {currentProduct.limited && (
                  <span className={`ml-2 sm:ml-6 text-amber-400 text-xs sm:text-sm font-light opacity-80 hover:opacity-100 transition-opacity ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}>
                    LIMITED TO {currentProduct.pieces} PIECES
                  </span>
                )}
              </div>
              <div className="absolute top-4 sm:top-8 md:top-12 right-4 sm:right-8 md:right-12 z-10">
                <span className={`text-amber-400 text-xs sm:text-sm font-light opacity-80 hover:opacity-100 transition-opacity ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}>
                  AVAILABLE
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                {/* Text Content */}
                <div className="space-y-2 sm:space-y-4 relative flex flex-col justify-start h-full">
                  {/* Current Product (No Animation) */}
                  <div className="mt-0">
                    {isAegisProduct ? (
                      <>
                        <div className="text-gray-400 text-xs sm:text-sm">{currentProduct.category}</div>
                        <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                          AEGIS PRO
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentProduct.description}</p>
                        <div className="mt-3 sm:mt-6">
                          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentProduct.price}</span>
                        </div>
                        <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                          FIND OUT MORE
                        </button>
                      </>
                    ) : isNovaProduct ? (
                      <div className={`${animating && ((isAegisProduct !== (previousProduct < 4)) || (isQuantumDisplay !== (previousProduct >= 7))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                        <div className="text-gray-400 text-xs sm:text-sm">{currentProduct.category}</div>
                        <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                          NOVA SPECTER
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentProduct.description}</p>
                        <div className="mt-3 sm:mt-6">
                          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentProduct.price}</span>
                        </div>
                        <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                          FIND OUT MORE
                        </button>
                      </div>
                    ) : (
                      <div className={`${animating && ((isNovaProduct !== (previousProduct >= 4 && previousProduct < 7)) || (isAegisProduct !== (previousProduct < 4))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                        <div className="text-gray-400 text-xs sm:text-sm">{currentProduct.category}</div>
                        <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                          QUANTUM DISPLAY
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentProduct.description}</p>
                        <div className="mt-3 sm:mt-6">
                          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentProduct.price}</span>
                        </div>
                        <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                          FIND OUT MORE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Product Images */}
                <div className="flex justify-end items-center relative mr-2 sm:mr-8">
                  {/* Previous Product Image (Animating Out) */}
                  {animating && (
                    <img 
                      src={products[previousProduct].image} 
                      alt={products[previousProduct].name}
                      className={`absolute h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] max-h-[500px] w-auto object-contain product-shadow ${direction === 'right' ? 'slide-out-left' : 'slide-out-right'}`}
                    />
                  )}
                  
                  {/* Current Product Image */}
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    className={`h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] max-h-[500px] w-auto object-contain product-shadow float-animation ${animating ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}
                  />
                </div>
              </div>

              {/* Bottom feature bar with enhanced dots */}
              <div className="flex justify-between items-center mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                  <Keyboard className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>PREMIUM BUILD</span>
                </div>
                
                {/* Enhanced Product pagination dots */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2">
                    {products.map((_, index) => (
                      <button
                        key={`product-${index}`}
                        onClick={() => changeProduct(index)}
                        className={`group relative`}
                      >
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          activeProduct === index 
                            ? 'bg-amber-400 scale-110' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`} />
                        {/* Hover preview */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-black/80 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                            {products[index].name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Current product number */}
                  <div className="text-xs text-gray-400">
                    {activeProduct + 1} / {products.length}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                  <Cpu className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>HIGH PERFORMANCE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product model info */}
          <div className={`${getCardBgClass()} backdrop-blur-xl p-3 sm:p-4 md:p-6 border-t border-gray-800/30 relative z-10 flex-shrink-0`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className={`text-white text-xs sm:text-sm md:text-base font-medium uppercase ${animating && (isAegisProduct !== (previousProduct < 4)) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                  {isAegisProduct ? "AEGIS PRO" : 
                   isNovaProduct ? "NOVA SPECTER" : 
                   isQuantumDisplay ? "QUANTUM DISPLAY" :
                   currentProduct.name}
                </span>
                <span className={`text-gray-400 text-xs ${animating && (isAegisProduct !== (previousProduct < 4)) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                  {currentProduct.model}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 