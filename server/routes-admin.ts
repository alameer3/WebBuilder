import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { insertMovieSchema } from '@shared/schema';
import { tmdbService } from './services/tmdb';

const router = Router();

// Admin: Add content from TMDB
router.post('/admin/import-movie', async (req, res) => {
  try {
    const { tmdbId } = req.body;
    
    if (!tmdbId) {
      return res.status(400).json({ message: "معرف TMDB مطلوب" });
    }

    // Check if movie already exists
    const existingMovie = await storage.getMovieById(tmdbId.toString());
    if (existingMovie) {
      return res.status(409).json({ message: "الفيلم موجود بالفعل في قاعدة البيانات" });
    }

    // Fetch from TMDB
    const tmdbMovie = await tmdbService.getMovieDetails(parseInt(tmdbId));
    if (!tmdbMovie) {
      return res.status(404).json({ message: "الفيلم غير موجود في TMDB" });
    }

    // Convert to our format
    const movieData = {
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      description: tmdbMovie.overview || '',
      year: parseInt(tmdbMovie.release_date?.split('-')[0] || '2024'),
      poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : '',
      backdrop: tmdbMovie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${tmdbMovie.backdrop_path}` : '',
      genre: tmdbMovie.genres?.map((g: any) => g.name) || [],
      rating: tmdbMovie.vote_average || 0,
      imdbRating: tmdbMovie.vote_average || 0,
      tmdbRating: tmdbMovie.vote_average || 0,
      tags: [],
      trailer: tmdbMovie.videos?.results?.find((v: any) => v.type === 'Trailer')?.key ? 
               `https://www.youtube.com/watch?v=${tmdbMovie.videos?.results?.find((v: any) => v.type === 'Trailer')?.key}` : '',
      duration: tmdbMovie.runtime || 0,
      category: "movie",
      quality: "HD",
      language: "ar",
      subtitle: ["ar"],
      country: tmdbMovie.production_countries?.[0]?.name || "",
      isNew: true,
      isFeatured: false,
      isRecommended: false
    };

    const movie = await storage.createMovie(movieData as any);
    res.json({ success: true, movie, message: "تم إضافة الفيلم بنجاح" });

  } catch (error) {
    console.error("Import movie error:", error);
    res.status(500).json({ message: "خطأ في استيراد الفيلم" });
  }
});

// Admin: Search TMDB for movies to import
router.get('/admin/tmdb-search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: "نص البحث مطلوب" });
    }

    // Note: searchMovies method needs to be implemented in tmdbService
    // const results = await tmdbService.searchMovies(query as string);
    const results = { results: [] }; // Placeholder until method is implemented
    res.json(results);

  } catch (error) {
    console.error("TMDB search error:", error);
    res.status(500).json({ message: "خطأ في البحث" });
  }
});

// Admin: Bulk import popular movies
router.post('/admin/import-popular', async (req, res) => {
  try {
    const { page = 1, count = 20 } = req.body;
    
    const popularMovies = await tmdbService.getPopularMovies(page);
    const importedMovies = [];
    let skippedCount = 0;

    for (const tmdbMovie of popularMovies.results.slice(0, count)) {
      try {
        // Check if already exists
        const existing = await storage.getMovieById(tmdbMovie.id.toString());
        if (existing) {
          skippedCount++;
          continue;
        }

        // Import movie
        const movieData = {
          title: tmdbMovie.title,
          originalTitle: tmdbMovie.original_title,
          description: tmdbMovie.overview || '',
          year: parseInt(tmdbMovie.release_date?.split('-')[0] || '2024'),
          poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : '',
          backdrop: tmdbMovie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${tmdbMovie.backdrop_path}` : '',
          genre: tmdbMovie.genre_ids?.map((id: number) => `Genre${id}`) || [],
          rating: tmdbMovie.vote_average || 0,
          imdbRating: tmdbMovie.vote_average || 0,
          tmdbRating: tmdbMovie.vote_average || 0,
          tags: [],
          trailer: '',
          duration: 0,
          category: "movie",
          quality: "HD", 
          language: "ar",
          subtitle: ["ar"],
          country: "",
          isNew: true,
          isFeatured: tmdbMovie.vote_average > 8,
          isRecommended: tmdbMovie.popularity > 100
        };

        const movie = await storage.createMovie(movieData);
        importedMovies.push(movie);

      } catch (movieError) {
        console.error(`Error importing movie ${tmdbMovie.id}:`, movieError);
        continue;
      }
    }

    res.json({ 
      success: true, 
      imported: importedMovies.length,
      skipped: skippedCount,
      message: `تم استيراد ${importedMovies.length} فيلم، تم تخطي ${skippedCount} فيلم موجود مسبقاً`
    });

  } catch (error) {
    console.error("Bulk import error:", error);
    res.status(500).json({ message: "خطأ في الاستيراد المجمع" });
  }
});

// Admin: Update movie
router.put('/admin/movies/:id', async (req, res) => {
  try {
    const validatedData = insertMovieSchema.partial().parse(req.body);
    // Note: updateMovie method needs to be implemented in storage
    // const movie = await storage.updateMovie(req.params.id, validatedData);
    const movie = null; // Placeholder until method is implemented
    
    if (!movie) {
      return res.status(404).json({ message: "الفيلم غير موجود" });
    }
    
    res.json({ success: true, movie });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
    } else {
      console.error("Update movie error:", error);
      res.status(500).json({ message: "خطأ في تحديث الفيلم" });
    }
  }
});

// Admin: Delete movie
router.delete('/admin/movies/:id', async (req, res) => {
  try {
    // Note: deleteMovie method needs to be implemented in storage  
    // const success = await storage.deleteMovie(req.params.id);
    const success = false; // Placeholder until method is implemented
    
    if (!success) {
      return res.status(404).json({ message: "الفيلم غير موجود" });
    }
    
    res.json({ success: true, message: "تم حذف الفيلم بنجاح" });
  } catch (error) {
    console.error("Delete movie error:", error);
    res.status(500).json({ message: "خطأ في حذف الفيلم" });
  }
});

export default router;