
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/tours?destination=${encodeURIComponent(destination)}&date=${date ? format(date, "yyyy-MM-dd") : ''}&guests=${guests}`);
  };

  return (
    <div className={cn("glass-card p-2 md:p-4 rounded-xl max-w-5xl mx-auto", className)}>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Destination */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="text-foreground w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
        </div>

        {/* Date */}
        <div className="w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-auto justify-start text-left font-normal px-10 py-3 h-auto relative",
                  !date  ? "text-muted-foreground"  : "text-foreground"
                )}
              >
                <CalendarIcon className="h-5 w-5 absolute left-3" />
                {date ? format(date, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="relative w-full md:w-auto">  
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Users className="h-5 w-5" />
          </div>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full md:w-auto pl-10 pr-12 py-3 rounded-lg appearance-none border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow text-foreground"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <Button type="submit" className="px-8 py-3 h-auto">
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
