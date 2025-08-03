import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RatingSystemProps {
  movieId: string;
  currentRating?: number;
  totalRatings?: number;
  userRating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function RatingSystem({
  movieId,
  currentRating = 0,
  totalRatings = 0,
  userRating,
  onRate,
  readonly = false,
  size = "md",
  showText = true,
}: RatingSystemProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleRating = async (rating: number) => {
    if (readonly || !onRate || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onRate(rating);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStar = (index: number) => {
    const rating = hoverRating || currentRating;
    const isFilled = index <= rating;
    const isHalfFilled = index - 0.5 <= rating && index > rating;
    
    return (
      <button
        key={index}
        className={cn(
          "relative transition-all duration-200",
          !readonly && "hover:scale-110 cursor-pointer",
          readonly && "cursor-default"
        )}
        onClick={() => handleRating(index)}
        onMouseEnter={() => !readonly && setHoverRating(index)}
        onMouseLeave={() => !readonly && setHoverRating(0)}
        disabled={readonly || isSubmitting}
      >
        {isHalfFilled ? (
          <StarHalf 
            className={cn(
              sizeClasses[size],
              "fill-yellow-400 text-yellow-400"
            )}
          />
        ) : (
          <Star
            className={cn(
              sizeClasses[size],
              isFilled 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-300 dark:fill-gray-600 dark:text-gray-600",
              hoverRating >= index && !readonly && "fill-yellow-300 text-yellow-300"
            )}
          />
        )}
      </button>
    );
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>

      {/* Rating Text */}
      {showText && (
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {formatRating(currentRating)}
          </span>
          
          {totalRatings > 0 && (
            <Badge variant="secondary" className="text-xs">
              {totalRatings.toLocaleString()} تقييم
            </Badge>
          )}
        </div>
      )}

      {/* User Rating Badge */}
      {userRating && userRating !== currentRating && (
        <Badge variant="outline" className="text-xs">
          تقييمك: {userRating}
        </Badge>
      )}

      {/* Loading State */}
      {isSubmitting && (
        <div className="text-xs text-gray-500">
          جاري الحفظ...
        </div>
      )}
    </div>
  );
}

// Display-only rating component for lists
export function DisplayRating({ 
  rating, 
  size = "sm", 
  showText = true 
}: { 
  rating: number; 
  size?: "sm" | "md" | "lg"; 
  showText?: boolean;
}) {
  return (
    <RatingSystem
      movieId=""
      currentRating={rating}
      readonly={true}
      size={size}
      showText={showText}
    />
  );
}

// Interactive rating component for forms
export function InteractiveRating({
  movieId,
  onRate,
  initialRating = 0,
}: {
  movieId: string;
  onRate: (rating: number) => Promise<void>;
  initialRating?: number;
}) {
  return (
    <RatingSystem
      movieId={movieId}
      currentRating={initialRating}
      onRate={onRate}
      readonly={false}
      size="lg"
      showText={true}
    />
  );
}