import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Play, Star, Eye, Calendar, TrendingUp, Film, Tv, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@shared/schema";

export default function Home() {
  const { data: featuredMovies, isLoading: featuredLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/movies?featured=true");
      if (!response.ok) throw new Error("Failed to fetch featured movies");
      return response.json();
    },
  });

  const { data: recentMovies, isLoading: recentLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies", "recent"],
    queryFn: async () => {
      const response = await fetch("/api/movies?recent=true");
      if (!response.ok) throw new Error("Failed to fetch recent movies");
      return response.json();
    },
  });

  const { data: allMovies, isLoading: allLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      if (!response.ok) throw new Error("Failed to fetch movies");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
              <span className="text-white">يمن</span>
              <span className="text-orange-500">فليكس</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 animate-slide-up">
              الموقع اليمني الأول لمشاهدة الأفلام والمسلسلات العربية والأجنبية بجودة عالية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/movies">
                <Button size="lg" className="yf-btn-primary text-lg px-8 py-4">
                  <Film className="h-5 w-5 mr-2" />
                  استكشف الأفلام
                </Button>
              </Link>
              <Link href="/series">
                <Button size="lg" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-lg px-8 py-4">
                  <Tv className="h-5 w-5 mr-2" />
                  المسلسلات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-white">الأعمال المميزة</h2>
            </div>
            <Link href="/movies">
              <Button variant="ghost" className="text-orange-500 hover:text-orange-400">
                عرض الكل
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 aspect-[2/3] rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredMovies?.slice(0, 5).map((movie) => (
                <Card key={movie.id} className="yf-movie-card group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.poster || "/placeholder-movie.jpg"}
                        alt={movie.title}
                        className="w-full aspect-[2/3] object-cover rounded-t-lg"
                      />
                      
                      <div className="yf-rating">
                        <Star className="h-3 w-3 inline mr-1" />
                        {movie.rating}
                      </div>

                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href={`/movie/${movie.id}`}>
                          <Button className="yf-btn-primary">
                            <Play className="h-4 w-4 mr-2" />
                            مشاهدة
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {movie.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{movie.year}</span>
                      </div>

                      <Badge className="bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {movie.quality}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Additions Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl font-bold text-white">الأحدث إضافة</h2>
            </div>
            <Link href="/recent">
              <Button variant="ghost" className="text-orange-500 hover:text-orange-400">
                عرض الكل
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          </div>

          {recentLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 aspect-[2/3] rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentMovies?.slice(0, 6).map((movie) => (
                <Card key={movie.id} className="yf-movie-card group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.poster || "/placeholder-movie.jpg"}
                        alt={movie.title}
                        className="w-full aspect-[2/3] object-cover rounded-lg"
                      />
                      
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        جديد
                      </div>

                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href={`/movie/${movie.id}`}>
                          <Button size="sm" className="yf-btn-primary">
                            <Play className="h-3 w-3 mr-1" />
                            مشاهدة
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-3">
                      <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                        {movie.title}
                      </h3>
                      <div className="text-xs text-gray-400">{movie.year}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">استكشف المحتوى</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              اكتشف مجموعة واسعة من الأفلام والمسلسلات في جميع التصنيفات
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "أفلام", icon: Film, href: "/movies", color: "bg-blue-500" },
              { name: "مسلسلات", icon: Tv, href: "/series", color: "bg-green-500" },
              { name: "الأحدث", icon: Clock, href: "/recent", color: "bg-purple-500" },
              { name: "برامج", icon: Eye, href: "/shows", color: "bg-red-500" },
              { name: "متنوع", icon: TrendingUp, href: "/mix", color: "bg-yellow-500" },
              { name: "المفضلة", icon: Star, href: "/favorites", color: "bg-pink-500" },
            ].map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.name} href={category.href}>
                  <Card className="yf-movie-card group hover:scale-105 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">{allMovies?.length || 0}</div>
              <div className="text-orange-100">إجمالي الأعمال</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{allMovies?.filter(m => m.category === 'movie').length || 0}</div>
              <div className="text-orange-100">أفلام</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{allMovies?.filter(m => m.category === 'series').length || 0}</div>
              <div className="text-orange-100">مسلسلات</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">متاح دائماً</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            ابدأ رحلتك في عالم الترفيه
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            انضم إلى آلاف المستخدمين واستمتع بمشاهدة أفضل الأفلام والمسلسلات
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="yf-btn-primary text-lg px-8 py-4">
                إنشاء حساب مجاني
              </Button>
            </Link>
            <Link href="/movies">
              <Button size="lg" variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white text-lg px-8 py-4">
                تصفح بدون تسجيل
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
