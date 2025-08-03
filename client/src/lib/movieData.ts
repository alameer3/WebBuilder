// Mock data for development - In production, this would come from the API

export interface Movie {
  id: number;
  title: string;
  arabicTitle?: string;
  year?: number;
  posterUrl: string;
  rating?: number;
  quality?: string[];
  type: 'movie' | 'series' | 'show' | 'episode';
  genre?: string[];
  isNew?: boolean;
  description?: string;
  duration?: number;
  country?: string;
  director?: string;
  cast?: string[];
  trailerUrl?: string;
  downloadLinks?: { quality: string; url: string; size: string; }[];
}

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    arabicTitle: "فارس الظلام",
    year: 2008,
    posterUrl: "/api/placeholder/300/450",
    rating: 9.0,
    quality: ["BluRay", "1080p"],
    type: "movie",
    genre: ["أكشن", "جريمة", "دراما"],
    isNew: false,
    description: "عندما يظهر التهديد المعروف باسم الجوكر ليخل بالفوضى والهلع على أهل غوثام، يجب على باتمان أن يقبل أحد أكبر التحديات النفسية والجسدية لمكافحة الظلم.",
    duration: 152,
    country: "أمريكا",
    director: "كريستوفر نولان",
    cast: ["كريستيان بيل", "هيث ليدجر", "آرون إيكهارت"],
    trailerUrl: "/api/placeholder/video",
    downloadLinks: [
      { quality: "1080p BluRay", url: "#", size: "2.1 GB" },
      { quality: "720p BluRay", url: "#", size: "1.2 GB" },
      { quality: "480p WEB-DL", url: "#", size: "800 MB" }
    ]
  },
  {
    id: 2,
    title: "Breaking Bad",
    arabicTitle: "بريكنج باد",
    year: 2008,
    posterUrl: "/api/placeholder/300/450",
    rating: 9.5,
    quality: ["WEB-DL", "1080p"],
    type: "series",
    genre: ["دراما", "جريمة", "إثارة"],
    isNew: false,
    description: "مدرس كيمياء في المرحلة الثانوية يحول حياته عندما يُشخص بسرطان الرئة المتقدم ويقرر تصنيع وبيع الميثامفيتامين لتأمين مستقبل عائلته المالي.",
    country: "أمريكا",
    director: "فينس غيليغان",
    cast: ["براين كرانستون", "آرون بول", "آنا غان"]
  },
  {
    id: 3,
    title: "Game of Thrones",
    arabicTitle: "صراع العروش",
    year: 2011,
    posterUrl: "/api/placeholder/300/450",
    rating: 8.8,
    quality: ["WEB-DL", "4K"],
    type: "series",
    genre: ["دراما", "مغامرات", "فانتازيا"],
    isNew: false,
    description: "تسع عائلات نبيلة تتقاتل للسيطرة على أراضي ويستيروس، بينما عدو قديم يعود بعد آلاف السنين من السكون.",
    country: "أمريكا",
    director: "ديفيد بينيوف",
    cast: ["شون بين", "مارك أدي", "نيكولاج كوستر-والداو"]
  },
  {
    id: 4,
    title: "Inception",
    arabicTitle: "البداية",
    year: 2010,
    posterUrl: "/api/placeholder/300/450",
    rating: 8.8,
    quality: ["BluRay", "1080p"],
    type: "movie",
    genre: ["خيال علمي", "أكشن", "إثارة"],
    isNew: false,
    description: "لص ماهر هو الأفضل في فن الاستخراج الخطير، سرقة الأسرار من العقل الباطن أثناء حالة الحلم، عندما يكون العقل في أضعف حالاته.",
    duration: 148,
    country: "أمريكا",
    director: "كريستوفر نولان",
    cast: ["ليوناردو دي كابريو", "كين واتانابي", "جوزيف غوردون-ليفيت"]
  },
  {
    id: 5,
    title: "The Mandalorian",
    arabicTitle: "المندلوريان",
    year: 2019,
    posterUrl: "/api/placeholder/300/450",
    rating: 8.7,
    quality: ["WEB-DL", "4K"],
    type: "series",
    genre: ["خيال علمي", "مغامرات", "أكشن"],
    isNew: true,
    description: "مقاتل مندلوريان وحيد يشق طريقه عبر المجرة الخارجية، بعيداً عن سلطة الجمهورية الجديدة.",
    country: "أمريكا",
    director: "جون فافرو",
    cast: ["بيدرو باسكال", "جينا كارانو", "كارل ويذرز"]
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    arabicTitle: "المنتقمون: نهاية اللعبة",
    year: 2019,
    posterUrl: "/api/placeholder/300/450",
    rating: 8.4,
    quality: ["BluRay", "4K"],
    type: "movie",
    genre: ["أكشن", "مغامرات", "دراما"],
    isNew: true,
    description: "بعد الأحداث المدمرة في حرب اللانهاية، يتجمع المنتقمون مرة أخيرة في مغامرة عظيمة لاستعادة الكون وإحضار أصدقائهم المفقودين.",
    duration: 181,
    country: "أمريكا", 
    director: "الأخوان روسو",
    cast: ["روبرت داوني جونيور", "كريس إيفانز", "مارك روفالو"]
  }
];

export const getMoviesByType = (type: 'movie' | 'series' | 'show' | 'episode') => {
  return sampleMovies.filter(movie => movie.type === type);
};

export const searchMovies = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return sampleMovies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.arabicTitle?.toLowerCase().includes(lowercaseQuery) ||
    movie.genre?.some(g => g.toLowerCase().includes(lowercaseQuery))
  );
};

export const getMovieById = (id: number) => {
  return sampleMovies.find(movie => movie.id === id);
};

export const getFeaturedMovies = () => {
  return sampleMovies.filter(movie => movie.rating && movie.rating >= 8.5);
};

export const getNewMovies = () => {
  return sampleMovies.filter(movie => movie.isNew);
};