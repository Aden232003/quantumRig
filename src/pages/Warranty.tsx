import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Clock, 
  Wrench,
  Truck,
  HeartHandshake,
  Crown,
  Star,
  MenuIcon,
  User,
  ShoppingCart,
  Heart,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

// Import warranty card images
import bronzeCard from '/warrantycards/bronze.png';
import silverCard from '/warrantycards/silver.png';
import goldCard from '/warrantycards/gold.png';
import blackCard from '/warrantycards/black.png';

const warrantyPlans = [
  {
    id: 'bronze',
    name: 'BRONZE CARE',
    title: 'Essentials, On Us',
    description: 'Every PC deserves basic protection. With the Bronze Plan, you\'re automatically registered for essential hardware coverage and knowledge base access—free of charge.',
    price: 'FREE',
    color: 'from-amber-700 to-amber-900',
    features: [
      '1-Year Standard Warranty',
      'Protection for Motherboard, RAM, PSU',
      'Access to Knowledge Base',
      'Email Support (Standard Queue)',
      'Activation upon device registration'
    ],
    icon: <Shield className="w-8 h-8" />,
    image: bronzeCard
  },
  {
    id: 'silver',
    name: 'SILVER CARE',
    title: 'Stronger Support for Everyday Builders',
    description: 'The Silver Plan is perfect for serious creators and competitive gamers. You get extended coverage and faster replacement cycles—no downtime, no worries.',
    price: '$36/year',
    color: 'from-gray-400 to-gray-600',
    features: [
      '2-Year Extended Warranty',
      'Full Hardware Coverage (GPU, SSD, Fans included)',
      '1-Day Replacement Window',
      'Email + Live Chat Support',
      'Priority Diagnostics Queue'
    ],
    icon: <Star className="w-8 h-8" />,
    image: silverCard
  },
  {
    id: 'gold',
    name: 'GOLD CARE',
    title: 'For Those Who Push Their Machines to the Limit',
    description: 'Built for power users, the Gold Plan includes top-tier support, accidental damage cover, and annual diagnostic checks for long-term performance.',
    price: '$72/year',
    color: 'from-yellow-500 to-amber-600',
    features: [
      '3-Year Premium Warranty',
      'Accidental Damage Coverage (One Incident)',
      'Annual Hardware Health Check',
      'Phone + Chat + Email Support',
      'Express Service Queue'
    ],
    icon: <Crown className="w-8 h-8" />,
    image: goldCard
  },
  {
    id: 'black',
    name: 'BLACK ELITE',
    title: 'Lifetime Armor for the Elite',
    description: 'This is not just protection. It\'s a long-term pact with your machine. Black Plan offers lifetime care, theft protection, and VIP-level service. One-time fee. Infinite value.',
    price: '$149/one-time',
    color: 'from-gray-900 to-black',
    features: [
      'Lifetime Hardware Coverage',
      'Advanced Diagnostics + Remote Assist',
      'Unlimited Part Replacements (T&C apply)',
      '24/7 Global Support',
      'Physical Theft Replacement',
      'Loyalty Discounts'
    ],
    icon: <HeartHandshake className="w-8 h-8" />,
    image: blackCard
  }
];

const Warranty: React.FC = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add('card-slide-in');
    }
  }, []);

  // Automatically select the first plan when showing plans
  useEffect(() => {
    if (showPlans && !selectedPlan) {
      setSelectedPlan(warrantyPlans[0].id);
    }
  }, [showPlans, selectedPlan]);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
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
      newCard.style.top = `${-rect.height}px`;
      newCard.style.left = `${rect.left}px`;
      newCard.style.width = `${rect.width}px`;
      newCard.style.height = `${rect.height}px`;
      newCard.style.zIndex = '60';
      newCard.className += ' card-clone card-clone-enter';
      document.body.appendChild(newCard);
      
      // Navigate after animation
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.removeChild(blurOverlay);
        }
        document.body.removeChild(newCard);
        document.body.classList.remove('page-transition');
        navigate(path);
      }, 600);
    } else {
      navigate(path);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleBack = () => {
    setSelectedPlan(null);
  };

  const selectedPlanData = selectedPlan ? warrantyPlans.find(p => p.id === selectedPlan) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Card Section */}
      <div className="relative z-10 w-full max-w-[95%] lg:max-w-[92%] xl:max-w-[90%] mx-auto px-2 py-2 md:py-3 lg:py-4 flex items-center justify-center min-h-[95vh]">
        <div 
          ref={cardRef}
          className="card-container rounded-3xl overflow-hidden backdrop-blur-md bg-black/30 border border-gray-800/50 shadow-2xl transition-all duration-300 hover:border-amber-500/30 w-full max-h-[95vh] md:max-h-[90vh] flex flex-col"
        >
          {/* Glossy black overlay for the entire card */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>

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
                      onClick={(e) => handleNavigation(e, '/home')}
                    >HOME</Link>
                    <Link to="/products" 
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => handleNavigation(e, '/products')}
                    >PRODUCTS</Link>
                    <Link to="/warranty" className="text-white border-b border-amber-500 pb-1">WARRANTY & SERVICE</Link>
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

          {/* Main Content */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-16 relative z-10 flex-grow overflow-hidden flex flex-col">
            {!showPlans ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-center">
                <h2 className="text-7xl sm:text-8xl font-bold tracking-widest mb-8 text-white/90">
                  PROTECT YOUR POWER
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Premium PCs deserve premium care. Choose from our tailored warranty plans.
                </p>
                <button 
                  onClick={() => setShowPlans(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-medium tracking-wider transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-lg shadow-blue-500/20"
                >
                  View Plans <ChevronRight className="w-6 h-6 ml-2" />
                </button>
              </div>
            ) : (
              <div className="flex h-full min-h-[600px]">
                {/* Plan Selection Sidebar */}
                <div className="w-1/4 pr-6 border-r border-gray-800/30 flex flex-col justify-start pt-12">
                  <div className="space-y-4">
                    {warrantyPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full p-4 rounded-xl transition-all duration-300 ${
                          selectedPlan === plan.id
                            ? 'bg-amber-500/20 border border-amber-500/50'
                            : 'bg-gray-800/30 hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-900/50 rounded-lg">
                            {plan.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold">{plan.name}</h3>
                            <p className="text-sm text-gray-400">{plan.price}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plan Details Container */}
                <div className="w-3/4 pl-6 flex items-start -translate-y-6">
                  {selectedPlanData ? (
                    <div className="bg-black/40 rounded-2xl p-6 w-full max-w-3xl">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{selectedPlanData.name}</h2>
                          <h3 className="text-xl text-gray-300 mb-3">{selectedPlanData.title}</h3>
                          <p className="text-gray-400 max-w-xl text-sm">{selectedPlanData.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{selectedPlanData.price}</div>
                          <div className="text-xs text-gray-400">
                            {selectedPlanData.price === 'FREE' ? '' : selectedPlanData.id === 'black' ? 'one-time' : 'per year'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5 mb-6">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                          <img 
                            src={selectedPlanData.image} 
                            alt={selectedPlanData.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-lg font-bold">Plan Features</h4>
                          <ul className="space-y-2">
                            {selectedPlanData.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-300 text-sm">
                                <Wrench className="w-3.5 h-3.5 mr-2 text-amber-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={handleBack}
                          className="px-5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => setShowConfirmation(true)}
                          className="px-5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors text-sm"
                        >
                          Select Plan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-400 text-xl">Select a plan to view details</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && selectedPlanData && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-gray-900/80 rounded-3xl p-8 max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold">Congratulations!</h3>
                    <button 
                      onClick={() => setShowConfirmation(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="text-center mb-8">
                    <p className="text-xl text-gray-300 mb-4">
                      You've received your {selectedPlanData.name} Warranty Card
                    </p>
                    <img 
                      src={selectedPlanData.image} 
                      alt={selectedPlanData.name}
                      className="w-64 h-40 object-contain mx-auto mb-6"
                    />
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setShowConfirmation(false)}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Back to Plans
                      </button>
                      <button 
                        onClick={() => navigate('/home')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty; 