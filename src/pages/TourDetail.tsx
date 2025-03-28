
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Share2, 
  ChevronRight, 
  Plus, 
  Minus, 
  Check,
  Coffee,
  Hotel,
  Utensils,
  Bus,
  AlertCircle,
  Image,
  X
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/ui/TourCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
//pmport image,video
import Image1 from "@/Assets/image4.jpg";
import Image2 from "@/Assets/image5.jpg";
import Image3 from "@/Assets/image6.jpg";
import Image4 from "@/Assets/image7.jpg";
import Image5 from "@/Assets/image9.jpg";
import Image6 from "@/Assets/image8.jpg";
import Why1 from "@/Assets/Why1.jpg";
import Why2 from "@/Assets/Why2.jpg";
import Why3 from "@/Assets/Why3.jpg";
// Mock data for a single tour
const tourData = {
  id: "tour-1",
  title: "Adventure Trek in the Swiss Alps",
  location: "Swiss Alps, Switzerland",
  price: 1299,
  duration: "7 days",
  rating: 4.9,
  reviews: 127,
  image: Image3,
  gallery: [
    Image1,
    Image2,
    Image4,
    Image5
  ],
  description: "Experience the breathtaking beauty of the Swiss Alps on this 7-day adventure trek. Hike through pristine alpine meadows, witness stunning mountain vistas, and immerse yourself in charming Swiss culture. Our experienced guides will lead you through some of the most scenic trails in Switzerland, ensuring a safe and unforgettable journey.",
  highlights: [
    "Summit iconic Alpine peaks with experienced mountain guides",
    "Traverse the famous Glacier Trail with panoramic mountain views",
    "Stay in authentic Swiss mountain huts and luxury lodges",
    "Experience traditional Swiss cuisine and hospitality",
    "Small group sizes (max 10 people) for a personalized experience"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Zurich",
      description: "Welcome to Switzerland! Arrive at Zurich International Airport and transfer to our hotel in the charming city. Enjoy a welcome dinner and orientation with your guide and fellow travelers."
    },
    {
      day: 2,
      title: "Transfer to Interlaken",
      description: "After breakfast, we'll travel to Interlaken, the gateway to the Bernese Alps. Afternoon acclimatization hike to prepare for the coming days. Enjoy spectacular views of the Eiger, Mönch, and Jungfrau mountains."
    },
    {
      day: 3,
      title: "Grindelwald Valley Hike",
      description: "Full-day hike through the spectacular Grindelwald Valley. We'll trek through alpine meadows, forests, and encounter stunning views of glaciers and waterfalls. Picnic lunch en route."
    },
    {
      day: 4,
      title: "Lauterbrunnen and Stechelberg",
      description: "Explore the magnificent Lauterbrunnen Valley, known as the 'Valley of 72 Waterfalls.' Hike from Lauterbrunnen to Stechelberg, witnessing cascading waterfalls and dramatic cliff faces."
    },
    {
      day: 5,
      title: "Schilthorn Summit",
      description: "Cable car to Mürren, then trek toward the famous Schilthorn summit. Enjoy lunch at the revolving restaurant with 360° views of the Alps. Optional James Bond experience at the summit."
    },
    {
      day: 6,
      title: "Lake Thun Cruise and Hike",
      description: "Morning cruise on Lake Thun, followed by a moderate lakeside hike with views of medieval castles. Farewell dinner in a traditional Swiss restaurant."
    },
    {
      day: 7,
      title: "Departure Day",
      description: "Morning at leisure before transfer to Zurich Airport for departure. Option to extend your stay or connect to other European destinations."
    }
  ],
  includes: ["Professional English-speaking guide", "6 nights accommodation", "All breakfasts and dinners", "Transportation within Switzerland", "Cable car and boat tickets", "Welcome and farewell dinners"],
  excludes: ["International flights", "Travel insurance", "Personal expenses", "Lunches (except picnic on day 3)", "Gratuities"],
  faqs: [
    {
      question: "What is the difficulty level of this trek?",
      answer: "This trek is rated as moderate. Participants should be in good physical condition and comfortable walking 5-7 hours per day on varied terrain with some elevation gain."
    },
    {
      question: "What should I pack for this trip?",
      answer: "Essentials include hiking boots, weather-appropriate clothing (layers), rain gear, sunscreen, water bottle, daypack, and personal medications. A detailed packing list will be provided upon booking."
    },
    {
      question: "Is travel insurance required?",
      answer: "Yes, comprehensive travel insurance that covers medical emergencies, trip cancellation, and adventure activities is required for all participants."
    },
    {
      question: "What is the maximum group size?",
      answer: "To ensure a quality experience and minimize environmental impact, our groups are limited to 10 participants."
    },
    {
      question: "Can dietary restrictions be accommodated?",
      answer: "Yes, we can accommodate most dietary restrictions with advance notice. Please inform us of any requirements when booking."
    }
  ]
};

// Mock data for recommended tours
const recommendedTours = [
  {
    id: "tour-2",
    title: "Ancient Temples of Cambodia",
    location: "Siem Reap, Cambodia",
    price: 899,
    duration: "5 days",
    rating: 4.8,
    reviews: 95,
    image: Image5
  },
  {
    id: "tour-3",
    title: "Mediterranean Coastal Cruise",
    location: "Santorini, Greece",
    price: 1599,
    duration: "10 days",
    rating: 4.9,
    reviews: 214,
    image: Image6
  },
  {
    id: "tour-4",
    title: "Safari Adventure in the Serengeti",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "8 days",
    rating: 4.7,
    reviews: 89,
    image: Image3
  }
];

const TourDetail = () => {
  const { id } = useParams();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [travelerCount, setTravelerCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(tourData.image);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { toast } = useToast();
  
  // Mock available dates
  const availableDates = [
    "June 15, 2023",
    "June 29, 2023",
    "July 13, 2023",
    "July 27, 2023",
    "August 10, 2023",
    "August 24, 2023"
  ];

  useEffect(() => {
    setIsPageLoaded(true);
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Combine main image with gallery for lightbox
  const allImages = [tourData.image, ...tourData.gallery];

  const handleAddToCart = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select a departure date before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart!",
      description: `${tourData.title} (${selectedDate}) for ${travelerCount} ${travelerCount === 1 ? 'traveler' : 'travelers'} has been added to your cart.`,
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/tours" className="hover:text-foreground">Tours</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground font-medium truncate">
                {tourData.title}
              </span>
            </div>
          </div>
        </div>
        
        {/* Tour Gallery */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden h-[400px] lg:h-[500px] cursor-pointer" onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}>
                <img src={mainImage} alt={tourData.title} className="w-full h-full object-cover" />
                
                {/* View all photos button */}
                <button 
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(0);
                    setLightboxOpen(true);
                  }}
                >
                  <Image className="h-4 w-4 mr-2" />
                  View all photos
                </button>
              </div>
              
              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-4">
                {tourData.gallery.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="rounded-xl overflow-hidden h-[190px] lg:h-[240px] cursor-pointer"
                    onClick={() => {
                      setLightboxIndex(index + 1);
                      setLightboxOpen(true);
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${tourData.title} - gallery ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onMouseEnter={() => setMainImage(image)}
                      onMouseLeave={() => setMainImage(tourData.image)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Tour Information */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tour Details */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{tourData.location}</span>
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">{tourData.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <span className="ml-1 font-medium">{tourData.rating}</span>
                    <span className="text-muted-foreground ml-1">({tourData.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center ml-6">
                    <button 
                      onClick={() => setIsLiked(!isLiked)} 
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>Save</span>
                    </button>
                    
                    <button className="flex items-center text-muted-foreground hover:text-foreground ml-4">
                      <Share2 className="h-5 w-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="glass-card px-4 py-3 rounded-lg flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>{tourData.duration}</span>
                  </div>
                  
                  <div className="glass-card px-4 py-3 rounded-lg flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span>Max 10 people</span>
                  </div>
                  
                  <div className="glass-card px-4 py-3 rounded-lg flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span>Available all year</span>
                  </div>
                </div>
                
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="included">What's Included</TabsTrigger>
                    <TabsTrigger value="faq">FAQs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="animate-fade-in">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-display text-xl font-medium mb-4">About This Tour</h3>
                        <p className="text-muted-foreground leading-relaxed">{tourData.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-display text-xl font-medium mb-4">Highlights</h3>
                        <ul className="space-y-3">
                          {tourData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary" className="animate-fade-in">
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-medium mb-4">Detailed Itinerary</h3>
                      
                      {tourData.itinerary.map((day) => (
                        <div key={day.day} className="glass-card p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                              Day {day.day}
                            </div>
                          </div>
                          <h4 className="font-medium text-lg mb-2">{day.title}</h4>
                          <p className="text-muted-foreground">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="included" className="animate-fade-in">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-display text-xl font-medium mb-4">What's Included</h3>
                        <ul className="space-y-3">
                          {tourData.includes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-display text-xl font-medium mb-4">What's Not Included</h3>
                        <ul className="space-y-3">
                          {tourData.excludes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Minus className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 mr-2" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="animate-fade-in">
                    <div>
                      <h3 className="font-display text-xl font-medium mb-4">Frequently Asked Questions</h3>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {tourData.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Booking Card */}
              <div className="lg:sticky lg:top-24 self-start">
                <div className="glass-card p-6 rounded-xl shadow-sm">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-3xl font-display font-semibold">${tourData.price}</span>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                  
                  {/* Date Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Date</label>
                    <select 
                      className="w-full p-3 border border-input rounded-lg bg-background"
                      value={selectedDate || ''}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="" disabled>Select departure date</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Traveler Count */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Travelers</label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
                        className="p-2 border border-input rounded-l-lg"
                        disabled={travelerCount <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="px-4 py-2 border-t border-b border-input text-center min-w-[60px]">
                        {travelerCount}
                      </div>
                      <button 
                        onClick={() => setTravelerCount(Math.min(10, travelerCount + 1))}
                        className="p-2 border border-input rounded-r-lg"
                        disabled={travelerCount >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total Price */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">${tourData.price} x {travelerCount} travelers</span>
                      <span className="font-medium">${tourData.price * travelerCount}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-xl">${tourData.price * travelerCount}</span>
                    </div>
                  </div>
                  
                  {/* Booking Button */}
                  <div className="space-y-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full py-3"
                      size="lg"
                    >
                      Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full py-3"
                      size="lg"
                    >
                      Reserve Now
                    </Button>
                  </div>
                  
                  {/* Policy Note */}
                  <div className="mt-4 flex items-start text-xs text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                    <p>Free cancellation up to 30 days before departure. A 20% fee applies for cancellations between 15-29 days.</p>
                  </div>
                </div>
                
                {/* Contact Card */}
                <div className="glass-card p-6 rounded-xl mt-4 text-center">
                  <p className="mb-3">Need help with this tour?</p>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar Tours */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-10">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedTours.map((tour, index) => (
                <div 
                  key={tour.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TourCard {...tour} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Image Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center animate-fade-in">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white p-2 z-10"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          
          <img 
            src={allImages[lightboxIndex]} 
            alt={`Gallery image ${lightboxIndex + 1}`} 
            className="max-h-[80vh] max-w-[90vw] object-contain" 
          />
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 p-4">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setLightboxIndex(index)}
                className={`w-2 h-2 rounded-full ${index === lightboxIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetail;
