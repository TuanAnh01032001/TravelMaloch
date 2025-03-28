
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, MapPin, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  className?: string;
  featured?: boolean;
}

const TourCard = ({
  id,
  title,
  location,
  price,
  duration,
  rating,
  reviews,
  image,
  className,
  featured = false,
}: TourCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden transition-all duration-300 glass-card hover:shadow-md",
        featured ? "h-full" : "h-[400px]",
        className
      )}
    >
      <div className="relative h-[60%] overflow-hidden">
        {/* Image with blur-up loading */}
        <div 
          className={cn(
            "absolute inset-0 bg-muted/20 animate-pulse",
            isImageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <img 
          src={image} 
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Price tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 font-medium text-sm">
          ${price.toLocaleString()}<span className="text-xs text-muted-foreground">/person</span>
        </div>

        {/* Like button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full transition-transform duration-300 hover:scale-110"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors", 
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            )} 
          />
        </button>

        {/* Duration */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span>{duration}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col h-[40%]">
        {/* Location */}
        <div className="flex items-center space-x-1.5 text-sm text-muted-foreground mb-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <Link to={`/tours/${id}`}>
          <h3 className="font-display text-lg font-medium mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-auto">
          <div className="flex items-center space-x-1.5">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">({reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
