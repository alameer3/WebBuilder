// إضافة بيانات تجريبية للمسلسلات والبرامج
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

// بيانات مسلسلات تجريبية
const sampleSeries = [
  {
    title: "فريندز",
    originalTitle: "Friends",
    description: "يحكي المسلسل عن ستة أصدقاء في العشرينيات والثلاثينيات من عمرهم يعيشون في مانهاتن، نيويورك.",
    year: 1994,
    duration: 22,
    rating: 8.9,
    imdbRating: 8.9,
    tmdbRating: 8.9,
    genre: ["كوميديا", "رومانسية", "دراما"],
    tags: ["صداقة", "نيويورك", "كوميديا"],
    poster: "https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg",
    trailer: "https://www.youtube.com/watch?v=hDNNmeeJs1Q",
    quality: "HD",
    language: "ar",
    subtitle: ["ar", "en"],
    category: "series",
    section: "مترجم",
    country: "United States",
    director: ["ديفيد كرين", "مارتا كوفمان"],
    cast: ["جينيفر أنيستون", "كورتني كوكس", "ليزا كودرو", "مات لو بلانك", "ماثيو بيري", "ديفيد شويمر"],
    writer: ["ديفيد كرين", "مارتا كوفمان"],
    producer: ["كيفين برايت"],
    isNew: false,
    isFeatured: true,
    isRecommended: true
  },
  {
    title: "لعبة العروش",
    originalTitle: "Game of Thrones",
    description: "في عالم خيالي حيث تتنافس عائلات نبيلة على العرش الحديدي لممالك وستروس السبع.",
    year: 2011,
    duration: 57,
    rating: 9.3,
    imdbRating: 9.3,
    tmdbRating: 9.3,
    genre: ["دراما", "فانتازيا", "أكشن"],
    tags: ["ملحمة", "تنانين", "سياسة"],
    poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
    trailer: "https://www.youtube.com/watch?v=rlR4PJn8b8I",
    quality: "4K",
    language: "ar",
    subtitle: ["ar", "en"],
    category: "series",
    section: "مترجم",
    country: "United States",
    director: ["ديفيد بنيوف", "دان وايس"],
    cast: ["بيتر دينكلج", "إيميليا كلارك", "كيت هارينغتون", "سوفي تيرنر"],
    writer: ["جورج مارتن"],
    producer: ["ديفيد بنيوف"],
    isNew: false,
    isFeatured: true,
    isRecommended: true
  }
];

// بيانات برامج تجريبية
const sampleShows = [
  {
    title: "برنامج الحصاد",
    originalTitle: "Al Hassad",
    description: "برنامج إخباري يستعرض أهم الأحداث والأخبار العربية والعالمية.",
    year: 2020,
    duration: 60,
    rating: 8.5,
    imdbRating: 8.5,
    tmdbRating: 8.5,
    genre: ["إخباري", "سياسي"],
    tags: ["أخبار", "تحليل سياسي"],
    poster: "https://image.tmdb.org/t/p/w500/placeholder1.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/placeholder1.jpg",
    trailer: "",
    quality: "HD",
    language: "ar",
    subtitle: ["ar"],
    category: "show",
    section: "عربي",
    country: "Qatar",
    director: ["أحمد منصور"],
    cast: ["أحمد منصور"],
    writer: ["فريق الحصاد"],
    producer: ["الجزيرة"],
    isNew: true,
    isFeatured: true,
    isRecommended: true
  },
  {
    title: "خواطر",
    originalTitle: "Khawater",
    description: "برنامج تنموي يهدف لتطوير المجتمع العربي من خلال طرح أفكار إيجابية.",
    year: 2005,
    duration: 45,
    rating: 9.0,
    imdbRating: 9.0,
    tmdbRating: 9.0,
    genre: ["تنموي", "تعليمي"],
    tags: ["تطوير ذات", "مجتمع"],
    poster: "https://image.tmdb.org/t/p/w500/placeholder2.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/placeholder2.jpg",
    trailer: "",
    quality: "HD",
    language: "ar",
    subtitle: ["ar"],
    category: "show",
    section: "عربي",
    country: "UAE",
    director: ["أحمد الشقيري"],
    cast: ["أحمد الشقيري"],
    writer: ["أحمد الشقيري"],
    producer: ["أحمد الشقيري"],
    isNew: false,
    isFeatured: true,
    isRecommended: true
  }
];

async function addData() {
  try {
    console.log('إضافة المسلسلات...');
    for (const series of sampleSeries) {
      const response = await fetch(`${BASE_URL}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(series)
      });
      const result = await response.json();
      console.log(`تم إضافة المسلسل: ${series.title}`);
    }

    console.log('إضافة البرامج...');
    for (const show of sampleShows) {
      const response = await fetch(`${BASE_URL}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(show)
      });
      const result = await response.json();
      console.log(`تم إضافة البرنامج: ${show.title}`);
    }

    console.log('تم الانتهاء من إضافة البيانات التجريبية');
  } catch (error) {
    console.error('خطأ في إضافة البيانات:', error);
  }
}

addData();