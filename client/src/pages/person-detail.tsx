import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Person {
  id: number;
  name: string;
  arabicName: string;
  bio: string;
  birthDate: string;
  nationality: string;
  photo: string;
  knownFor: string;
  movies: Movie[];
  series: Series[];
}

interface Movie {
  id: number;
  title: string;
  year: string;
  rating: number;
  poster: string;
  role: string;
}

interface Series {
  id: number;
  title: string;
  year: string;
  rating: number;
  poster: string;
  role: string;
}

export default function PersonDetail() {
  const [, params] = useRoute("/person/:id");
  const { id } = params || {};

  const { data: person, isLoading } = useQuery<Person>({
    queryKey: ['/api/persons', id],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#161619] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="w-full h-96 bg-gray-700 rounded"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-[#161619] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">الشخص غير موجود</h1>
            <p className="text-gray-400">عذراً، لم نتمكن من العثور على هذا الشخص.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161619] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <nav className="text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-[#f3951e]">الرئيسية</a>
            <span className="mx-2">›</span>
            <span>الممثلون</span>
            <span className="mx-2">›</span>
            <span>{person.arabicName}</span>
          </nav>
        </div>

        {/* معلومات الشخص */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* الصورة */}
          <div className="text-center lg:text-right">
            <img 
              src={person.photo} 
              alt={person.arabicName}
              className="w-full max-w-md mx-auto lg:mx-0 rounded-lg shadow-lg"
            />
          </div>

          {/* التفاصيل */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-[#f3951e] mb-2">{person.arabicName}</h1>
            <h2 className="text-2xl text-gray-300 mb-6">{person.name}</h2>

            <div className="bg-[#27272c] rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">معلومات شخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">تاريخ الميلاد:</span>
                  <span className="mr-2 text-white">{person.birthDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">الجنسية:</span>
                  <span className="mr-2 text-white">{person.nationality}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-400">معروف بـ:</span>
                  <span className="mr-2 text-white">{person.knownFor}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#27272c] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">السيرة الذاتية</h3>
              <p className="text-gray-300 leading-relaxed">{person.bio}</p>
            </div>
          </div>
        </div>

        {/* الأعمال */}
        <div className="space-y-8">
          {/* الأفلام */}
          <div>
            <h2 className="text-2xl font-bold mb-6">الأفلام ({person.movies?.length || 0})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {person.movies?.map((movie) => (
                <div key={movie.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-[#f3951e] text-white px-3 py-1 rounded-full text-sm">
                          {movie.rating}/10
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{movie.title}</h4>
                  <p className="text-xs text-gray-400">{movie.year}</p>
                  <p className="text-xs text-[#f3951e]">{movie.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* المسلسلات */}
          <div>
            <h2 className="text-2xl font-bold mb-6">المسلسلات ({person.series?.length || 0})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {person.series?.map((series) => (
                <div key={series.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <img 
                      src={series.poster} 
                      alt={series.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-[#f3951e] text-white px-3 py-1 rounded-full text-sm">
                          {series.rating}/10
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{series.title}</h4>
                  <p className="text-xs text-gray-400">{series.year}</p>
                  <p className="text-xs text-[#f3951e]">{series.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}