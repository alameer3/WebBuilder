import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Play, Heart, Share2, Star, Clock, Calendar, Download, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { Movie } from "@shared/schema";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["/api/movies", id],
    queryFn: async () => {
      const response = await fetch(`/api/movies/${id}`);
      if (!response.ok) throw new Error("Failed to fetch movie");
      return response.json();
    },
    enabled: !!id,
  });

  const addToFavoritesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user-1", // This would come from auth context
          movieId: id,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to add to favorites");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تمت الإضافة للمفضلة",
        description: "تم إضافة العمل لقائمة المفضلة بنجاح",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.message || "فشل في إضافة العمل للمفضلة",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              <div className="h-32 bg-gray-800 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">العمل غير موجود</h1>
        <p className="text-gray-400">لم يتم العثور على العمل المطلوب</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster || '/placeholder-backdrop.jpg'})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="yf-btn-primary text-lg px-8 py-4">
              <Play className="h-6 w-6 mr-3" />
              مشاهدة الآن
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{movie.title}</h1>
            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <h2 className="text-xl text-gray-400 mb-4">{movie.originalTitle}</h2>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-white font-semibold">{movie.rating}</span>
                <span className="text-gray-400">/10</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{movie.year}</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{movie.duration} دقيقة</span>
              </div>
              
              <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20">
                {movie.quality}
              </Badge>
              
              <Badge className="bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {movie.language}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="yf-genre-tag">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="yf-btn-primary">
              <Play className="h-4 w-4 mr-2" />
              مشاهدة
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => addToFavoritesMutation.mutate()}
              disabled={addToFavoritesMutation.isPending}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <Heart className="h-4 w-4 mr-2" />
              إضافة للمفضلة
            </Button>
            
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              تحميل
            </Button>
            
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
              <Share2 className="h-4 w-4 mr-2" />
              مشاركة
            </Button>
            
            <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              مشاهدة لاحقاً
            </Button>
          </div>

          {/* Description */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">القصة</h3>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">معلومات إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">اللغة:</span>
                  <span className="text-white mr-2">{movie.language}</span>
                </div>
                <div>
                  <span className="text-gray-400">الجودة:</span>
                  <span className="text-white mr-2">{movie.quality}</span>
                </div>
                {movie.subtitle && movie.subtitle.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="text-gray-400">الترجمة:</span>
                    <span className="text-white mr-2">{movie.subtitle.join(", ")}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">المشاهدات:</span>
                  <span className="text-white mr-2">{movie.viewCount || 0}</span>
                </div>
                <div>
                  <span className="text-gray-400">تاريخ الإضافة:</span>
                  <span className="text-white mr-2">
                    {movie.addedDate ? new Date(movie.addedDate).toLocaleDateString('ar-YE') : 'غير محدد'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Movie Poster */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <img
                src={movie.poster || '/placeholder-movie.jpg'}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">التقييم</span>
                  <span className="text-yellow-500 font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المشاهدات</span>
                  <span className="text-white">{movie.viewCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المدة</span>
                  <span className="text-white">{movie.duration} د</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">السنة</span>
                  <span className="text-white">{movie.year}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {movie.isNew && (
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <h3 className="text-green-500 font-semibold mb-2">🎉 جديد</h3>
                <p className="text-gray-300 text-sm">هذا العمل جديد في مكتبتنا</p>
              </CardContent>
            </Card>
          )}

          {movie.isFeatured && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-4 text-center">
                <h3 className="text-orange-500 font-semibold mb-2">⭐ مميز</h3>
                <p className="text-gray-300 text-sm">من الأعمال المميزة المختارة</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}