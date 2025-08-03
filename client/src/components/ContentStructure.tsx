import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Film, 
  Tv, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Download, 
  Play,
  Heart,
  Share2,
  Bookmark,
  Languages,
  HardDrive,
  MapPin
} from "lucide-react";
import MovieCard from "./MovieCard";
import RatingSystem, { DisplayRating } from "./RatingSystem";
import CommentSystem from "./CommentSystem";
import type { Movie, Episode, Person } from "@shared/schema";

interface ContentStructureProps {
  content: Movie;
  contentType: "movie" | "series" | "show" | "mix";
}

export default function ContentStructure({ content, contentType }: ContentStructureProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorited, setIsFavorited] = useState(false);

  // Fetch related episodes if it's a series
  const { data: episodes = [] } = useQuery({
    queryKey: ["/api/episodes", content.id],
    queryFn: async () => {
      if (contentType !== "series") return [];
      const response = await fetch(`/api/episodes?seriesId=${content.id}`);
      if (!response.ok) throw new Error("Failed to fetch episodes");
      return response.json() as Episode[];
    },
    enabled: contentType === "series",
  });

  // Fetch cast and crew
  const { data: cast = [] } = useQuery({
    queryKey: ["/api/people", content.id],
    queryFn: async () => {
      const response = await fetch(`/api/people?movieId=${content.id}`);
      if (!response.ok) throw new Error("Failed to fetch cast");
      return response.json() as Person[];
    },
  });

  // Fetch related content
  const { data: relatedContent = [] } = useQuery({
    queryKey: ["/api/movies", "related", content.id],
    queryFn: async () => {
      const response = await fetch(`/api/movies?category=${content.category}&limit=8`);
      if (!response.ok) throw new Error("Failed to fetch related content");
      const data = await response.json();
      return data.movies?.filter((movie: Movie) => movie.id !== content.id) || [];
    },
  });

  const handleFavoriteToggle = async () => {
    try {
      const action = isFavorited ? "remove" : "add";
      const response = await fetch(`/api/favorites/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: content.id }),
      });
      
      if (response.ok) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}س ${mins}د` : `${mins}د`;
  };

  const getContentTypeLabel = () => {
    switch (contentType) {
      case "movie": return "فيلم";
      case "series": return "مسلسل";
      case "show": return "برنامج";
      case "mix": return "منوعات";
      default: return "محتوى";
    }
  };

  const groupEpisodesBySeason = (episodes: Episode[]) => {
    const grouped = episodes.reduce((acc, episode) => {
      const season = episode.seasonNumber;
      if (!acc[season]) acc[season] = [];
      acc[season].push(episode);
      return acc;
    }, {} as Record<number, Episode[]>);

    return Object.entries(grouped)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([season, eps]) => ({
        season: parseInt(season),
        episodes: eps.sort((a, b) => a.episodeNumber - b.episodeNumber)
      }));
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0">
          {content.backdrop && (
            <img
              src={content.backdrop}
              alt={content.title}
              className="w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="relative p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={content.poster}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Info */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{getContentTypeLabel()}</Badge>
                  <Badge variant="outline">{content.year}</Badge>
                  {content.quality && <Badge variant="outline">{content.quality}</Badge>}
                </div>
                
                <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
                {content.originalTitle && (
                  <h2 className="text-xl text-gray-300 mb-4">{content.originalTitle}</h2>
                )}
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {content.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(content.duration)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{content.year}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <span>{content.language}</span>
                </div>
                
                {content.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{content.country}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {content.rating && (
                <div className="flex items-center gap-4">
                  <DisplayRating rating={content.rating} size="lg" />
                  {content.imdbRating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 font-semibold">IMDB</span>
                      <span>{content.imdbRating}/10</span>
                    </div>
                  )}
                </div>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {content.genre?.map((g, index) => (
                  <Badge key={index} variant="outline" className="text-white border-white/30">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  مشاهدة
                </Button>
                
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="w-5 h-5" />
                  تحميل
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleFavoriteToggle}
                  className={`gap-2 ${isFavorited ? 'text-red-500 border-red-500' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'مضاف للمفضلة' : 'إضافة للمفضلة'}
                </Button>
                
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="w-5 h-5" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          {contentType === "series" && <TabsTrigger value="episodes">الحلقات</TabsTrigger>}
          <TabsTrigger value="cast">الطاقم</TabsTrigger>
          <TabsTrigger value="related">محتوى مشابه</TabsTrigger>
          <TabsTrigger value="comments">التعليقات</TabsTrigger>
          <TabsTrigger value="details">التفاصيل</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>القصة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.description}
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{content.viewCount || 0}</div>
                <div className="text-sm text-gray-500">مشاهدة</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{content.downloadCount || 0}</div>
                <div className="text-sm text-gray-500">تحميل</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{content.likeCount || 0}</div>
                <div className="text-sm text-gray-500">إعجاب</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {content.rating ? content.rating.toFixed(1) : "N/A"}
                </div>
                <div className="text-sm text-gray-500">تقييم</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Episodes Tab (for series) */}
        {contentType === "series" && (
          <TabsContent value="episodes" className="space-y-6">
            {groupEpisodesBySeason(episodes).map(({ season, episodes: seasonEpisodes }) => (
              <Card key={season}>
                <CardHeader>
                  <CardTitle>الموسم {season}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {seasonEpisodes.map((episode) => (
                      <div key={episode.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex gap-3">
                          {episode.poster && (
                            <div className="w-16 h-12 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                              <img
                                src={episode.poster}
                                alt={episode.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">
                              {episode.episodeNumber}. {episode.title}
                            </h4>
                            {episode.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                                {episode.description}
                              </p>
                            )}
                            {episode.duration && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                                <Clock className="w-3 h-3" />
                                {formatDuration(episode.duration)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}

        {/* Cast Tab */}
        <TabsContent value="cast" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cast.map((person) => (
              <Card key={person.id} className="text-center">
                <CardContent className="p-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 bg-gray-200 dark:bg-gray-700">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium">{person.name}</h4>
                  {person.nameAr && person.nameAr !== person.name && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{person.nameAr}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2 justify-center">
                    {person.profession?.map((prof, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prof}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Related Content Tab */}
        <TabsContent value="related" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {relatedContent.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <CommentSystem movieId={content.id} showRating={true} />
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التفاصيل التقنية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">العنوان الأصلي:</span>
                  <span className="mr-2">{content.originalTitle || content.title}</span>
                </div>
                
                <div>
                  <span className="font-medium">سنة الإنتاج:</span>
                  <span className="mr-2">{content.year}</span>
                </div>
                
                <div>
                  <span className="font-medium">المدة:</span>
                  <span className="mr-2">{content.duration ? formatDuration(content.duration) : "غير محدد"}</span>
                </div>
                
                <div>
                  <span className="font-medium">الجودة:</span>
                  <span className="mr-2">{content.quality}</span>
                </div>
                
                <div>
                  <span className="font-medium">اللغة:</span>
                  <span className="mr-2">{content.language}</span>
                </div>
                
                {content.subtitle && content.subtitle.length > 0 && (
                  <div>
                    <span className="font-medium">الترجمة:</span>
                    <span className="mr-2">{content.subtitle.join(", ")}</span>
                  </div>
                )}
                
                {content.country && (
                  <div>
                    <span className="font-medium">بلد الإنتاج:</span>
                    <span className="mr-2">{content.country}</span>
                  </div>
                )}
                
                {content.section && (
                  <div>
                    <span className="font-medium">القسم:</span>
                    <span className="mr-2">{content.section}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">الكلمات المفتاحية</h4>
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}