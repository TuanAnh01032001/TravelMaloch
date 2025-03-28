
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import TourCard from "@/components/ui/TourCard";
import FeaturedDestination from "@/components/ui/FeaturedDestination";
import { Button } from "@/components/ui/button";

//import Assets video,image
import Video from "@/Assets/video.mp4";
import Image1 from "@/Assets/image1.jpg";
import Image2 from "@/Assets/image2.jpg";
import Image3 from "@/Assets/image3.jpg";
import Image4 from "@/Assets/image4.jpg";
import Image5 from "@/Assets/image9.jpg";
import Image6 from "@/Assets/image6.jpg";
import Why1 from "@/Assets/why1.jpg";
import Why2 from "@/Assets/why2.jpg";
import Why3 from "@/Assets/why3.jpg";
// Mock data for featured tours
const featuredTours = [
  {
    id: "tour-1",
    title: "Adventure Trek in the Swiss Alps",
    location: "Swiss Alps, Switzerland",
    price: 1299,
    duration: "7 days",
    rating: 4.9,
    reviews: 127,
    image: Image1,
  },
  {
    id: "tour-2",
    title: "Ancient Temples of Cambodia",
    location: "Siem Reap, Cambodia",
    price: 899,
    duration: "5 days",
    rating: 4.8,
    reviews: 95,
    image: Image3,
  },
  {
    id: "tour-3",
    title: "Mediterranean Coastal Cruise",
    location: "Santorini, Greece",
    price: 1599,
    duration: "10 days",
    rating: 4.9,
    reviews: 214,
    image: Image2,
  },
  {
    id: "tour-4",
    title: "Safari Adventure in the Serengeti",
    location: "Serengeti, Tanzania",
    price: 2499,
    duration: "8 days",
    rating: 4.7,
    reviews: 89,
    image: Image4,
  }
];

// Mock data for featured destinations
const featuredDestinations = [
  {
    name: "Santorini",
    country: "Greece",
    tours: 15,
    slug: "santorini-greece",
    image:Image4,
  },
  {
    name: "Kyoto",
    country: "Japan",
    tours: 8,
    slug: "kyoto-japan",
    image: Image5,
  },
  {
    name: "Bali",
    country: "Indonesia",
    tours: 22,
    slug: "bali-indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop"
  }
];

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Emma Roberts",
    location: "London, UK",
    content: "TravelTrove made planning our honeymoon effortless. The attention to detail and personalized service exceeded our expectations. Our trip to Bali was absolute perfection!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "James Wilson",
    location: "Toronto, Canada",
    content: "The safari experience TravelTrove arranged for my family was incredible. Our guide was knowledgeable, accommodations were luxurious, and we saw all the wildlife we hoped for and more.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Maria Gonzalez",
    location: "Barcelona, Spain",
    content: "As a solo traveler, I felt completely taken care of with TravelTrove. The group tours were well organized, and I made friends from around the world. Highly recommend their Japan tour!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop"
  }
];

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
      
        <video src={Video} autoPlay loop muted/>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="bg-primary/90 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block backdrop-blur-sm animate-slide-in">Unlock Your Travel Dreams With Us!</span>
            <h1 className="font-display text-5xl md:text-7xl font-semibold mb-6 animate-slide-up" style={{animationDelay: "200ms"}}>
              Explore the World's <span className="text-primary">Hidden Gems</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 animate-slide-up" style={{animationDelay: "400ms"}}>
              Curated experiences, unforgettable destinations, and seamless travel planning designed for the modern explorer.
            </p>
            
            {/* Search Bar */}
            <div className="animate-slide-up" style={{animationDelay: "600ms"}}>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tours Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title">Featured Tours</h2>
            <Link to="/tours" className="text-primary font-medium flex items-center group">
              <span>View all tours</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTours.map((tour, index) => (
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
      
      {/* Featured Destinations Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="pill bg-primary/10 text-primary mb-3 inline-block">Popular Destinations</span>
            <h2 className="section-title mb-4">Explore Top Destinations</h2>
            <p className="text-muted-foreground">
              Discover breathtaking locations curated by our travel experts and loved by travelers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {featuredDestinations.map((destination, index) => (
              <div 
                key={destination.slug} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <FeaturedDestination {...destination} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill bg-primary/10 text-primary mb-3 inline-block">Why TravelMaloch</span>
            <h2 className="section-title mb-4">Unforgettable Experiences, Simplified</h2>
            <p className="text-muted-foreground">
              We take care of the details so you can focus on creating memories that last a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Curated Experiences",
                description: "Our travel experts handpick each destination and activity to ensure authentic and extraordinary experiences.",
                icon: Why1,
              },
              {
                title: "Stress-Free Planning",
                description: "From accommodations to activities, we handle all the logistics so you can enjoy your journey without worry.",
                icon: Why2,
              },
              {
                title: "Local Expertise",
                description: "Connect with knowledgeable local guides who offer authentic insights and hidden gems in each destination.",
                icon: Why3,
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-2xl flex flex-col items-center text-center animate-fade-in" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill bg-primary/10 text-primary mb-3 inline-block">Testimonials</span>
            <h2 className="section-title mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground">
              Hear from travelers who have experienced the TravelTrove difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="glass-card p-6 rounded-xl animate-fade-in" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src= {Image6}
            alt="Adventure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-lg text-white/90 mb-10">
              Start planning your dream journey today and discover why thousands of travelers choose TravelTrove.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default" 
                className="bg-white text-primary hover:bg-white/90 text-foreground"
                // iconRight={<ArrowRight className="h-5 w-5" />}
                onClick={() => window.location.href = '/tours'}
              >
                Explore Tours
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20 text-foreground"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
