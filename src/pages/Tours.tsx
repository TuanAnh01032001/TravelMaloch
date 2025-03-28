
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, MapPin, Calendar, Users, X, Check, SlidersHorizontal } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/ui/TourCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

//pmport image,video
import Image1 from "@/Assets/image4.jpg";
import Image2 from "@/Assets/image5.jpg";
import Image3 from "@/Assets/image6.jpg";
import Image4 from "@/Assets/image7.jpg";
import Image5 from "@/Assets/image9.jpg";
import Image6 from "@/Assets/image8.jpg";
// Mock data for tours
const allTours = [
  {
    id: "tour-1",
    title: "Adventure Trek in the Swiss Alps",
    location: "Swiss Alps, Switzerland",
    price: 1299,
    duration: "7 days",
    rating: 4.9,
    reviews: 127,
    image: Image1,
    type: "Adventure",
    difficulty: "Moderate"
  },
  {
    id: "tour-2",
    title: "Ancient Temples of Cambodia",
    location: "Siem Reap, Cambodia",
    price: 899,
    duration: "5 days",
    rating: 4.8,
    reviews: 95,
    image: Image2,
    type: "Cultural",
    difficulty: "Easy"
  },
  {
    id: "tour-3",
    title: "Mediterranean Coastal Cruise",
    location: "Santorini, Greece",
    price: 1599,
    duration: "10 days",
    rating: 4.9,
    reviews: 214,
    image: Image3,
    type: "Cruise",
    difficulty: "Easy"
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
    type: "Wildlife",
    difficulty: "Moderate"
  },
  {
    id: "tour-5",
    title: "Tokyo Culinary and Culture Tour",
    location: "Tokyo, Japan",
    price: 1899,
    duration: "6 days",
    rating: 4.8,
    reviews: 152,
    image: Image5,
    type: "Culinary",
    difficulty: "Easy"
  },
  {
    id: "tour-6",
    title: "Fjords and Northern Lights",
    location: "Tromsø, Norway",
    price: 2799,
    duration: "9 days",
    rating: 4.9,
    reviews: 76,
    image: Image6,
    type: "Nature",
    difficulty: "Moderate"
  },
  {
    id: "tour-7",
    title: "Machu Picchu and Sacred Valley",
    location: "Cusco, Peru",
    price: 1699,
    duration: "8 days",
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1567597243073-2d274aabecec?q=80&w=1332&auto=format&fit=crop",
    type: "Adventure",
    difficulty: "Challenging"
  },
  {
    id: "tour-8",
    title: "Island Hopping in Thailand",
    location: "Phuket, Thailand",
    price: 1199,
    duration: "10 days",
    rating: 4.6,
    reviews: 183,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1038&auto=format&fit=crop",
    type: "Beach",
    difficulty: "Easy"
  }
];

const tourTypes = ["Adventure", "Cultural", "Cruise", "Wildlife", "Culinary", "Nature", "Beach"];
const difficulties = ["Easy", "Moderate", "Challenging"];
const durations = ["1-3 days", "4-7 days", "8-14 days", "14+ days"];

const Tours = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchedDestination = queryParams.get("destination") || "";
  
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [tours, setTours] = useState(allTours);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 3000],
    types: [] as string[],
    difficulties: [] as string[],
    durations: [] as string[],
    searchTerm: searchedDestination
  });

  useEffect(() => {
    setIsPageLoaded(true);
    
    // Apply initial destination filter if provided
    if (searchedDestination) {
      filterTours();
    }
  }, []);

  const filterTours = () => {
    let filteredTours = [...allTours];
    
    // Filter by price range
    filteredTours = filteredTours.filter(
      tour => tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]
    );
    
    // Filter by type
    if (filters.types.length > 0) {
      filteredTours = filteredTours.filter(tour => filters.types.includes(tour.type));
    }
    
    // Filter by difficulty
    if (filters.difficulties.length > 0) {
      filteredTours = filteredTours.filter(tour => filters.difficulties.includes(tour.difficulty));
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredTours = filteredTours.filter(
        tour => 
          tour.title.toLowerCase().includes(term) || 
          tour.location.toLowerCase().includes(term)
      );
    }
    
    setTours(filteredTours);
  };

  const handleCheckboxChange = (category: 'types' | 'difficulties' | 'durations', value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(item => item !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 3000],
      types: [],
      difficulties: [],
      durations: [],
      searchTerm: ""
    });
    setTours(allTours);
  };

  const applyFilters = () => {
    filterTours();
    setIsFilterOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-secondary to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Discover Tours</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Find the perfect tour for your next adventure, from cultural explorations to adrenaline-pumping excursions.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search destination or tour"
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                />
              </div>
              
              <Button
                onClick={() => filterTours()}
                className="bg-primary text-white px-6"
              >
                Search
              </Button>
              
              {/* Filter button for desktop */}
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-4 md:flex hidden items-center"
                    // iconLeft={<Filter className="h-4 w-4 mr-2" />}
                  >
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="py-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium text-lg">Filters</h3>
                      <button 
                        onClick={clearFilters} 
                        className="text-sm text-primary underline"
                      >
                        Clear all
                      </button>
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-4">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 3000]}
                          min={0}
                          max={3000}
                          step={100}
                          value={filters.priceRange}
                          onValueChange={(values) => setFilters(prev => ({ ...prev, priceRange: values }))}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tour Type */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-4">Tour Type</h4>
                      <div className="space-y-2">
                        {tourTypes.map(type => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`type-${type}`}
                              checked={filters.types.includes(type)}
                              onCheckedChange={() => handleCheckboxChange('types', type)}
                            />
                            <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Difficulty */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-4">Difficulty</h4>
                      <div className="space-y-2">
                        {difficulties.map(difficulty => (
                          <div key={difficulty} className="flex items-center">
                            <Checkbox
                              id={`difficulty-${difficulty}`}
                              checked={filters.difficulties.includes(difficulty)}
                              onCheckedChange={() => handleCheckboxChange('difficulties', difficulty)}
                            />
                            <label htmlFor={`difficulty-${difficulty}`} className="ml-2 text-sm">
                              {difficulty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Mobile filter button */}
              <Button
                variant="outline"
                className="md:hidden flex items-center"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Active filters */}
            {(filters.types.length > 0 || filters.difficulties.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 3000) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.priceRange[0] > 0 || filters.priceRange[1] < 3000 ? (
                  <div className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center">
                    <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 3000] }))}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null}
                
                {filters.types.map(type => (
                  <div key={type} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center">
                    <span>{type}</span>
                    <button 
                      onClick={() => handleCheckboxChange('types', type)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {filters.difficulties.map(difficulty => (
                  <div key={difficulty} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center">
                    <span>{difficulty}</span>
                    <button 
                      onClick={() => handleCheckboxChange('difficulties', difficulty)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary underline flex items-center"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {tours.length > 0 ? (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{tours.length}</span> tours
                </p>
                <div className="flex space-x-2 items-center">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="border border-input rounded-md p-1.5 text-sm bg-transparent">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration: Short to Long</option>
                    <option>Rating: High to Low</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tours.map((tour, index) => (
                  <div 
                    key={tour.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TourCard {...tour} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="font-display text-2xl font-medium mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any tours matching your search criteria. Please try adjusting your filters.
                </p>
                <Button onClick={clearFilters}>Reset Filters</Button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="font-display text-3xl font-medium mb-4">Can't find what you're looking for?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our travel experts can help you create a customized itinerary tailored to your preferences, interests, and budget.
              </p>
              <Button size="lg" variant="default">Contact a Travel Expert</Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Tours;
