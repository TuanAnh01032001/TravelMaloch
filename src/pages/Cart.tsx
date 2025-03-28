
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Calendar, Users, CreditCard, Check, X, ChevronLeft, ArrowRight, Info } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock cart data
const initialCartItems = [
  {
    id: "cart-1",
    tourId: "tour-1",
    title: "Adventure Trek in the Swiss Alps",
    location: "Swiss Alps, Switzerland",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1074&auto=format&fit=crop",
    date: "June 15, 2023",
    duration: "7 days",
    travelers: 2,
    pricePerPerson: 1299
  },
  {
    id: "cart-2",
    tourId: "tour-3",
    title: "Mediterranean Coastal Cruise",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1035&auto=format&fit=crop",
    date: "July 20, 2023",
    duration: "10 days",
    travelers: 1,
    pricePerPerson: 1599
  }
];

const Cart = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };
  
  const handleUpdateTravelers = (id: string, count: number) => {
    if (count < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, travelers: count } : item
    ));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "travel10") {
      setPromoApplied(true);
      setDiscount(0.1); // 10% discount
      toast({
        title: "Promo code applied!",
        description: "You received a 10% discount on your order.",
        variant: "default"
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive"
      });
    }
  };
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.pricePerPerson * item.travelers), 0);
  const discountAmount = promoApplied ? subtotal * discount : 0;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal - discountAmount + serviceFee;
  
  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">Your Cart</h1>
            <p className="text-muted-foreground">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-card p-4 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Tour Image */}
                      <div className="w-full md:w-1/3 h-[150px] rounded-lg overflow-hidden">
                        <Link to={`/tours/${item.tourId}`}>
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </Link>
                      </div>
                      
                      {/* Tour Details */}
                      <div className="flex-1">
                        <Link to={`/tours/${item.tourId}`}>
                          <h3 className="font-display text-xl font-medium mb-1 hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <p className="text-muted-foreground mb-3">{item.location}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-primary mr-1.5" />
                            <span>{item.date}</span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-primary mr-1.5" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          {/* Traveler Counter */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Travelers</label>
                            <div className="flex items-center">
                              <button
                                onClick={() => handleUpdateTravelers(item.id, item.travelers - 1)}
                                className="px-2 py-1 border border-input rounded-l-md"
                                disabled={item.travelers <= 1}
                              >
                                -
                              </button>
                              <span className="px-4 py-1 border-t border-b border-input">
                                {item.travelers}
                              </span>
                              <button
                                onClick={() => handleUpdateTravelers(item.id, item.travelers + 1)}
                                className="px-2 py-1 border border-input rounded-r-md"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          {/* Price and Remove */}
                          <div className="flex flex-col items-end">
                            <div className="text-right">
                              <span className="font-medium text-lg">
                                ${(item.pricePerPerson * item.travelers).toLocaleString()}
                              </span>
                              {item.travelers > 1 && (
                                <span className="block text-sm text-muted-foreground">
                                  ${item.pricePerPerson.toLocaleString()} per person
                                </span>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-muted-foreground hover:text-destructive mt-2 flex items-center text-sm"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Continue Shopping Link */}
                <div className="mt-8">
                  <Link
                    to="/tours"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="glass-card p-6 rounded-xl sticky top-24">
                  <h3 className="font-display text-xl font-medium mb-6">Order Summary</h3>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Service Fee</span>
                        <button className="ml-1 text-muted-foreground hover:text-foreground">
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                      <span>${serviceFee.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-xl">${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  {!promoApplied ? (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Promo Code</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-2 border border-input rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Try "TRAVEL10" for 10% off</p>
                    </div>
                  ) : (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <div className="flex-1">
                        <p className="font-medium text-green-700">Promo code applied!</p>
                        <p className="text-sm text-green-600">10% discount with code: {promoCode}</p>
                      </div>
                      <button
                        onClick={() => {
                          setPromoApplied(false);
                          setDiscount(0);
                          setPromoCode("");
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Checkout Button */}
                  <Button
                    className="w-full py-3"
                    size="lg"
                    // iconRight={<ArrowRight className="h-5 w-5" />}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  {/* Payment Methods */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Secure payment options</p>
                    <div className="flex justify-center gap-2">
                      <div className="bg-white p-1.5 rounded shadow-sm">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="bg-white p-1.5 rounded shadow-sm">
                        <span className="font-bold text-blue-700">PayPal</span>
                      </div>
                      <div className="bg-white p-1.5 rounded shadow-sm">
                        <span className="font-bold text-green-600">VNPAY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h2 className="font-display text-2xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any tours to your cart yet. Explore our available tours and start planning your next adventure!
                </p>
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/tours'}
                >
                  Browse Tours
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
