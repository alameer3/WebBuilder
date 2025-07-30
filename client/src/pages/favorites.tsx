import { useQuery } from "@tanstack/react-query";
import { Heart, Star, Play, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Movie } from "@shared/schema";

export default function Favorites() {
  const { data: favorites, isLoading } = useQuery<(Movie & { addedDate: Date })[]>({
    queryKey: ["/api/favorites", "user-1"], // This would come from auth context
    queryFn: async () => {
      const response = await fetch("/api/users/user-1/favorites");
      if (!response.ok) throw new Error("Failed to fetch favorites");
      return response.json();
    },
  });

  const removeFavorite = async (movieId: string) => {
    try {
      const response = await fetch(`/api/favorites/user-1/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove favorite");
      // Refetch favorites
      window.location.reload();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">المفضلة</h1>
          <p className="text-gray-400">أفلامك ومسلسلاتك المفضلة</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
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
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold text-white">المفضلة</h1>
        </div>
        <p className="text-gray-400">
          مجموعتك الشخصية من الأفلام والمسلسلات المفضلة ({favorites?.length || 0})
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((item) => (
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

                  {/* Added Date */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {new Date(item.addedDate).toLocaleDateString('ar-YE')}
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 left-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFavorite(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

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
                    <span className="capitalize">{item.category === 'movie' ? 'فيلم' : 'مسلسل'}</span>
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
                    <Badge className="bg-red-500/10 text-red-500 border border-red-500/20">
                      <Heart className="h-3 w-3 mr-1" />
                      مفضل
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">لا توجد عناصر في المفضلة</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            ابدأ بإضافة أفلامك ومسلسلاتك المفضلة من خلال النقر على زر القلب في صفحة العمل
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/movies">
              <Button className="yf-btn-primary">
                استكشاف الأفلام
              </Button>
            </Link>
            <Link href="/series">
              <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                استكشاف المسلسلات
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      {favorites && favorites.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                {favorites.length}
              </div>
              <div className="text-gray-400">إجمالي المفضلة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {favorites.filter(item => item.category === 'movie').length}
              </div>
              <div className="text-gray-400">أفلام</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {favorites.filter(item => item.category === 'series').length}
              </div>
              <div className="text-gray-400">مسلسلات</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}