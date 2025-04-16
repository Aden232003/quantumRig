import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, ShoppingCart, Search, Watch, Clock, Keyboard, Cpu, Menu } from 'lucide-react';

// Import local watch images from productImages folder
import aegisWatch from '/productImages/aegispro.png';
import aegisBackWatch from '/productImages/aegisBack.png';
import aegisHandsWatch from '/productImages/aegishands.png';
import aegisLayeredWatch from '/productImages/aegis3dlayered.png';
import mouseFrontWatch from '/productImages/mouse.png';
import mouseSideWatch from '/productImages/mouse2.png';
import mouseTopWatch from '/productImages/mouse3.png';
import monitorMainWatch from '/productImages/monitorMain.png';
import monitor2Watch from '/productImages/monitor2.png';
import monitor3Watch from '/productImages/monitor3.png';

interface Watch {
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

const watches: Watch[] = [
  {
    id: 1,
    name: "Aegis Chronograph",
    category: "Premium Timepiece",
    description: "Swiss movement with sapphire crystal and titanium case",
    price: "$1,999",
    image: aegisWatch,
    model: "WC-371SR-BK",
    limited: true,
    pieces: 100,
    color: "bg-blue-900"
  },
  {
    id: 2,
    name: "Aegis Chronograph",
    category: "Premium Timepiece",
    description: "Exhibition caseback showcasing intricate movement",
    price: "$1,999",
    image: aegisBackWatch,
    model: "WC-371SR-BK",
    limited: true,
    pieces: 100,
    color: "bg-indigo-900"
  },
  {
    id: 3,
    name: "Aegis Chronograph",
    category: "Premium Timepiece",
    description: "Ergonomic design for comfortable all-day wear",
    price: "$1,999",
    image: aegisHandsWatch,
    model: "WC-371SR-BK",
    limited: true,
    pieces: 100,
    color: "bg-violet-900"
  },
  {
    id: 4,
    name: "Aegis Chronograph",
    category: "Premium Timepiece",
    description: "Detailed view of the multi-layered movement construction",
    price: "$1,999",
    image: aegisLayeredWatch,
    model: "WC-371SR-BK",
    limited: true,
    pieces: 100,
    color: "bg-purple-900"
  },
  {
    id: 5,
    name: "Quantum Diver",
    category: "Sport Chronograph",
    description: "Water-resistant to 300m with rotating bezel",
    price: "$899",
    image: mouseFrontWatch,
    model: "WC-372SR-GD",
    limited: false,
    pieces: null,
    color: "bg-amber-900"
  },
  {
    id: 6,
    name: "Quantum Diver",
    category: "Sport Chronograph",
    description: "Sleek profile design with screw-down crown",
    price: "$899",
    image: mouseSideWatch,
    model: "WC-372SR-GD",
    limited: false,
    pieces: null,
    color: "bg-orange-900"
  },
  {
    id: 7,
    name: "Quantum Diver",
    category: "Sport Chronograph",
    description: "SuperLuminova dial markers for low-light visibility",
    price: "$899",
    image: mouseTopWatch,
    model: "WC-372SR-GD",
    limited: false,
    pieces: null,
    color: "bg-red-900"
  },
  {
    id: 8,
    name: "Nexus Display",
    category: "Gaming Monitor",
    description: "27-inch 4K OLED panel with 360Hz refresh rate",
    price: "$1,299",
    image: monitorMainWatch,
    model: "MD-270-4K",
    limited: true,
    pieces: 75,
    color: "bg-cyan-900"
  },
  {
    id: 9,
    name: "Nexus Display",
    category: "Gaming Monitor",
    description: "G-SYNC Ultimate with HDR 1000 for perfect gaming visuals",
    price: "$1,299",
    image: monitor2Watch,
    model: "MD-270-4K",
    limited: true,
    pieces: 75,
    color: "bg-blue-900"
  },
  {
    id: 10,
    name: "Nexus Display",
    category: "Gaming Monitor",
    description: "Ultra-low response time of 0.03ms for competitive gaming",
    price: "$1,299",
    image: monitor3Watch,
    model: "MD-270-4K",
    limited: true,
    pieces: 75,
    color: "bg-emerald-900"
  }
];

const Watches: React.FC = () => {
  const [activeWatch, setActiveWatch] = useState(0);
  const [previousWatch, setPreviousWatch] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [animating, setAnimating] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [cardBgOpacity, setCardBgOpacity] = useState<'light' | 'medium' | 'dark' | 'black'>('medium');
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const autoChangeRef = useRef<boolean>(true);
  
  const watchCategories = [
    "CHRONOGRAPH",
    "EXHIBITION",
    "ON WRIST",
    "EXPLODED VIEW",
    "DIVER",
    "DIVER PROFILE",
    "DIVER FACE",
    "MONITOR FRONT",
    "MONITOR SIDE",
    "MONITOR REAR"
  ];
  
  const changeWatch = (newIndex: number) => {
    if (animating) return;
    
    setAnimating(true);
    setPreviousWatch(activeWatch);
    
    // Determine direction based on indices
    if (newIndex === 0 && activeWatch === watches.length - 1) {
      setDirection('right');
    } else if (newIndex === watches.length - 1 && activeWatch === 0) {
      setDirection('left');
    } else {
      setDirection(newIndex > activeWatch ? 'right' : 'left');
    }
    
    setActiveWatch(newIndex);
    
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
      
      // Change watches based on swipe direction
      if (touchDiff > 0) {
        // Left swipe - previous watch
        const newIndex = (activeWatch - 1 + watches.length) % watches.length;
        changeWatch(newIndex);
      } else {
        // Right swipe - next watch
        const newIndex = (activeWatch + 1) % watches.length;
        changeWatch(newIndex);
      }
    }
    
    touchStartXRef.current = null;
  };
  
  // Left area click handler
  const handleLeftClick = () => {
    autoChangeRef.current = false;
    const newIndex = (activeWatch - 1 + watches.length) % watches.length;
    changeWatch(newIndex);
  };
  
  // Right area click handler
  const handleRightClick = () => {
    autoChangeRef.current = false;
    const newIndex = (activeWatch + 1) % watches.length;
    changeWatch(newIndex);
  };
  
  useEffect(() => {
    // Auto rotate watches
    const interval = setInterval(() => {
      if (autoChangeRef.current && !animating) {
        const newIndex = (activeWatch + 1) % watches.length;
        changeWatch(newIndex);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeWatch, animating]);
  
  // Get current watch data
  const currentWatch = watches[activeWatch];
  const isAegisWatch = activeWatch < 4;
  const isQuantumWatch = activeWatch >= 4 && activeWatch < 7;
  const isNexusDisplay = activeWatch >= 7;

  // Function to determine card background opacity
  const getCardBgClass = () => {
    return 'bg-black/30';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background blur with tint of the current watch - OUTSIDE the card only */}
      <div className="absolute inset-0 z-0">
        <img 
          src={watches[activeWatch].image} 
          alt="Background"
          className="w-full h-full object-cover opacity-50 blur-xl scale-110"
        />
        <div className={`absolute inset-0 ${currentWatch.color || 'bg-black/60'} opacity-40 mix-blend-overlay`}></div>
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
                  <Menu className="w-6 h-6 text-white md:hidden" />
                  <div className="hidden md:flex space-x-6 lg:space-x-12">
                    <Link to="/home" className="text-gray-300 hover:text-white transition-colors">HOME</Link>
                    <Link to="/products" className="text-gray-300 hover:text-white transition-colors">PRODUCTS</Link>
                    <Link to="/watches" className="text-white transition-colors border-b border-amber-500 pb-1">WATCHES</Link>
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
          <div className="px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-6 border-b border-gray-800/30 relative z-10 flex-shrink-0">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-3 sm:space-x-6">
                <div className="flex items-center space-x-1 text-gray-400 text-xs sm:text-sm">
                  <Keyboard className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="uppercase">Special Features</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-400 text-xs sm:text-sm uppercase">Sizes</span>
                <div className="flex mt-1 sm:mt-2 space-x-1 sm:space-x-2">
                  {['34', '37', '40', '41', '42', '43'].map(size => (
                    <div key={size} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs text-white cursor-pointer hover:bg-gray-700 transition-colors">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Product Display Area */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 flex-grow overflow-hidden">
            {/* Touch navigation areas */}
            <div className="touch-left" onClick={handleLeftClick}></div>
            <div className="touch-right" onClick={handleRightClick}></div>
            
            {/* Product info tags */}
            <div className="absolute top-4 sm:top-8 md:top-12 left-4 sm:left-8 md:left-12 flex items-center space-x-2 z-10">
              <span className="text-xs sm:text-sm font-light text-white/70">{currentWatch.model}</span>
              {currentWatch.limited && (
                <span className={`ml-2 sm:ml-6 text-amber-400 text-xs sm:text-sm font-light opacity-80 hover:opacity-100 transition-opacity ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}>
                  LIMITED TO {currentWatch.pieces} PIECES
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
              <div className="space-y-2 sm:space-y-4 relative flex flex-col justify-center h-full">
                {/* Current Watch (No Animation) */}
                <div>
                  {isAegisWatch ? (
                    <>
                      <div className="text-gray-400 text-xs sm:text-sm">{currentWatch.category}</div>
                      <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        CHRONOGRAPH
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentWatch.description}</p>
                      <div className="mt-3 sm:mt-6">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentWatch.price}</span>
                      </div>
                      <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                        FIND OUT MORE
                      </button>
                    </>
                  ) : isQuantumWatch ? (
                    <div className={`${animating && ((isAegisWatch !== (previousWatch < 4)) || (isNexusDisplay !== (previousWatch >= 7))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                      <div className="text-gray-400 text-xs sm:text-sm">{currentWatch.category}</div>
                      <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        DIVER PRO
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentWatch.description}</p>
                      <div className="mt-3 sm:mt-6">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentWatch.price}</span>
                      </div>
                      <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                        FIND OUT MORE
                      </button>
                    </div>
                  ) : (
                    <div className={`${animating && ((isQuantumWatch !== (previousWatch >= 4 && previousWatch < 7)) || (isAegisWatch !== (previousWatch < 4))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                      <div className="text-gray-400 text-xs sm:text-sm">{currentWatch.category}</div>
                      <h2 className="product-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        NEXUS DISPLAY
                      </h2>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3">{currentWatch.description}</p>
                      <div className="mt-3 sm:mt-6">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{currentWatch.price}</span>
                      </div>
                      <button className="find-out-more mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-2 sm:py-4 text-xs sm:text-sm">
                        FIND OUT MORE
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Images */}
              <div className="flex justify-end items-center relative mr-8">
                {/* Previous Product Image (Animating Out) */}
                {animating && (
                  <img 
                    src={watches[previousWatch].image} 
                    alt={watches[previousWatch].name}
                    className={`absolute h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[75vh] max-h-[700px] w-auto object-contain product-shadow ${direction === 'right' ? 'slide-out-left' : 'slide-out-right'}`}
                  />
                )}
                
                {/* Current Product Image */}
                <img 
                  src={currentWatch.image} 
                  alt={currentWatch.name}
                  className={`h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[75vh] max-h-[700px] w-auto object-contain product-shadow float-animation ${animating ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}
                />
              </div>
            </div>

            {/* Bottom feature bar */}
            <div className="flex justify-between items-center mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                <Keyboard className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>SWISS MADE</span>
              </div>
              
              {/* Watch pagination dots */}
              <div className="flex items-center space-x-1">
                {watches.map((_, index) => (
                  <button
                    key={`watch-${index}`}
                    onClick={() => changeWatch(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${activeWatch === index ? 'bg-amber-400' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                <Cpu className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>WATER RESISTANT</span>
              </div>
            </div>
          </div>

          {/* Watch model info */}
          <div className={`${getCardBgClass()} backdrop-blur-xl p-3 sm:p-4 md:p-6 border-t border-gray-800/30 relative z-10 flex-shrink-0`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className={`text-white text-xs sm:text-sm md:text-base font-medium uppercase ${animating && ((isAegisWatch !== (previousWatch < 4)) || (isNexusDisplay !== (previousWatch >= 7))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                  {currentWatch.name}
                </span>
                <span className={`text-gray-400 text-xs ${animating && ((isAegisWatch !== (previousWatch < 4)) || (isNexusDisplay !== (previousWatch >= 7))) ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                  {currentWatch.model}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-1">
                    {watchCategories.map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors duration-300 ${i === activeWatch ? 'bg-white' : 'bg-gray-600'} cursor-pointer`}
                        onClick={() => changeWatch(i)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watches; 