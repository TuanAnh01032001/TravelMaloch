
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedDestinationProps {
  name: string;
  country: string;
  image: string;
  tours: number;
  slug: string;
  className?: string;
}

const FeaturedDestination = ({
  name,
  country,
  image,
  tours,
  slug,
  className,
}: FeaturedDestinationProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/tours?destination=${encodeURIComponent(name)}`}
      className={cn(
        "block relative rounded-xl overflow-hidden group h-[350px]",
        className
      )}
    >
      {/* Image with blur-up loading */}
      <div 
        className={cn(
          "absolute inset-0 bg-muted/20 animate-pulse",
          isImageLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      <img
        src={image}
        alt={`${name}, ${country}`}
        className={cn(
          "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
          isImageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsImageLoaded(true)}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity group-hover:opacity-80" />
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-white/90 font-medium block mb-1">
              {country}
            </span>
            <h3 className="text-white font-display text-2xl font-medium">
              {name}
            </h3>
            <p className="text-white/80 text-sm mt-1">
              {tours} {tours === 1 ? "tour" : "tours"} available
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedDestination;
