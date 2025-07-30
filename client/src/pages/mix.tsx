import { useQuery } from "@tanstack/react-query";
import { Shuffle, Star, Play, Calendar, Film, Tv, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

export default function Mix() {
  const { data: mixedContent, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies", "mix"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      if (!response.ok) throw new Error("Failed to fetch mixed content");
      return response.json();
    },
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movie':
        return <Film className="h-4 w-4" />;
      case 'series':
        return <Tv className="h-4 w-4" />;
      case 'show':
        return <PlayCircle className="h-4 w-4" />;
      default:
        return <Shuffle className="h-4 w-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'movie':
        return 'فيلم';
      case 'series':
        return 'مسلسل';
      case 'show':
        return 'برنامج';
      default:
        return 'متنوع';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">متنوع</h1>
          <p className="text-gray-400">مجموعة متنوعة من المحتوى</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800 aspect-[2/3] rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-800 rounded mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shuffle className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">متنوع</h1>
        </div>
        <p className="text-gray-400">مجموعة متنوعة من الأفلام والمسلسلات والبرامج</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant="outline" className="bg-orange-500 border-orange-500 text-white hover:bg-orange-600">
          <Shuffle className="h-4 w-4 mr-2" />
          جميع المحتوى
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          <Film className="h-4 w-4 mr-2" />
          أفلام
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          <Tv className="h-4 w-4 mr-2" />
          مسلسلات
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          <PlayCircle className="h-4 w-4 mr-2" />
          برامج
        </Button>
      </div>

      {/* Mixed Content Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mixedContent?.map((item) => (
          <Card key={item.id} className="yf-movie-card group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={item.poster || "/placeholder-movie.jpg"}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover rounded-t-lg"
                />
                
                {/* Rating Badge */}
                <div className="yf-rating">
                  <Star className="h-3 w-3 inline mr-1" />
                  {item.rating}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                  {getCategoryIcon(item.category || 'movie')}
                  {getCategoryName(item.category || 'movie')}
                </div>

                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    جديد
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/movie/${item.id}`}>
                    <Button className="yf-btn-primary">
                      <Play className="h-4 w-4 mr-2" />
                      مشاهدة
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{item.year}</span>
                  <span className="mx-2">•</span>
                  <span>{item.language}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.genre.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="secondary" className="yf-genre-tag">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    {item.quality}
                  </Badge>
                  {item.viewCount && item.viewCount > 0 && (
                    <Badge className="bg-gray-500/10 text-gray-400 border border-gray-500/20">
                      {item.viewCount} مشاهدة
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          <Shuffle className="h-4 w-4 mr-2" />
          عشوائي - عرض المزيد
        </Button>
      </div>
    </div>
  );
}