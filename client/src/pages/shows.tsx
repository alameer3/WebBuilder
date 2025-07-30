import { useQuery } from "@tanstack/react-query";
import { PlayCircle, Star, Clock, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

export default function Shows() {
  const { data: shows, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies", "shows"],
    queryFn: async () => {
      const response = await fetch("/api/movies?category=show");
      if (!response.ok) throw new Error("Failed to fetch shows");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">البرامج</h1>
          <p className="text-gray-400">برامج متنوعة وممتعة</p>
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
          <PlayCircle className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">البرامج</h1>
        </div>
        <p className="text-gray-400">مجموعة متنوعة من البرامج الترفيهية والثقافية</p>
      </div>

      {/* Shows Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant="outline" className="bg-orange-500 border-orange-500 text-white hover:bg-orange-600">
          جميع البرامج
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          برامج ترفيهية
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          برامج ثقافية
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          برامج حوارية
        </Button>
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          برامج رياضية
        </Button>
      </div>

      {/* Shows Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows?.map((show) => (
          <Card key={show.id} className="yf-movie-card group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={show.poster || "/placeholder-show.jpg"}
                  alt={show.title}
                  className="w-full aspect-[2/3] object-cover rounded-t-lg"
                />
                
                {/* Rating Badge */}
                <div className="yf-rating">
                  <Star className="h-3 w-3 inline mr-1" />
                  {show.rating}
                </div>

                {/* Show Type Badge */}
                <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  برنامج
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/movie/${show.id}`}>
                    <Button className="yf-btn-primary">
                      <Play className="h-4 w-4 mr-2" />
                      مشاهدة
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {show.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{show.language}</span>
                  <span className="mx-2">•</span>
                  <span>{show.year}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {show.genre.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="secondary" className="yf-genre-tag">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    {show.quality}
                  </Badge>
                  {show.isNew && (
                    <Badge className="bg-green-500/10 text-green-500 border border-green-500/20">
                      جديد
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {shows?.length === 0 && (
        <div className="text-center py-16">
          <PlayCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">لا توجد برامج حالياً</h3>
          <p className="text-gray-500">سيتم إضافة برامج جديدة قريباً</p>
        </div>
      )}

      {/* Load More */}
      {shows && shows.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            عرض المزيد من البرامج
          </Button>
        </div>
      )}
    </div>
  );
}