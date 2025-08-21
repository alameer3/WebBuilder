import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertMovieSchema, 
  insertUserSchema,
  insertFavoriteSchema,
  insertNotificationSchema
} from "@shared/schema";
import { z } from "zod";
import { tmdbService } from "./services/tmdb";
import { dataPopulationService } from "./services/dataPopulation";
import adminRoutes from './routes-admin';

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Movies endpoints
  app.get("/api/movies", async (req, res) => {
    try {
      const {
        q: search,
        category,
        genre,
        year_min,
        year_max,
        rating_min,
        rating_max,
        quality,
        language,
        section,
        sort = "newest",
        order = "desc",
        limit = "20",
        offset = "0",
        featured,
        recent
      } = req.query;

      const filters = {
        search: search as string,
        category: category as string,
        genre: genre ? (genre as string).split(",") : undefined,
        yearMin: year_min ? parseInt(year_min as string) : undefined,
        yearMax: year_max ? parseInt(year_max as string) : undefined,
        ratingMin: rating_min ? parseFloat(rating_min as string) : undefined,
        ratingMax: rating_max ? parseFloat(rating_max as string) : undefined,
        quality: quality ? (quality as string).split(",") : undefined,
        language: language ? (language as string).split(",") : undefined,
        section: section as string,
        sortBy: sort as string,
        sortOrder: order as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        featured: featured === "true",
        recent: recent === "true"
      };

      const result = await storage.searchMoviesAdvanced(filters);
      res.json(result);
    } catch (error) {
      console.error("Get movies error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الأفلام" });
    }
  });

  app.get("/api/movies/:id", async (req, res) => {
    try {
      // First try to get from storage
      let movie = await storage.getMovieById(req.params.id);
      
      // Movie must exist in database - if not found, return 404
      // Content should be added through Admin Panel only
      
      if (!movie) {
        return res.status(404).json({ message: "الفيلم غير موجود" });
      }
      
      // Update view count
      await storage.updateMovieViews(req.params.id);
      
      res.json(movie);
    } catch (error) {
      console.error("Get movie error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الفيلم" });
    }
  });

  app.post("/api/movies", async (req, res) => {
    try {
      const validatedData = insertMovieSchema.parse(req.body);
      const movie = await storage.createMovie(validatedData);
      res.json({ success: true, movie });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Create movie error:", error);
        res.status(500).json({ message: "خطأ في إنشاء الفيلم" });
      }
    }
  });

  // Categories endpoint
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Get categories error:", error);
      // Return hardcoded categories as fallback
      const fallbackCategories = [
        { id: "1", name: "أفلام", nameAr: "أفلام", slug: "movies", type: "content" },
        { id: "2", name: "مسلسلات", nameAr: "مسلسلات", slug: "series", type: "content" },
        { id: "3", name: "برامج", nameAr: "برامج", slug: "shows", type: "content" },
        { id: "4", name: "متنوع", nameAr: "متنوع", slug: "mix", type: "content" }
      ];
      res.json(fallbackCategories);
    }
  });

  // Tags endpoint
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      console.error("Get tags error:", error);
      // Return hardcoded tags as fallback
      const fallbackTags = [
        { id: "1", name: "أكشن", nameAr: "أكشن", slug: "action" },
        { id: "2", name: "دراما", nameAr: "دراما", slug: "drama" },
        { id: "3", name: "كوميديا", nameAr: "كوميديا", slug: "comedy" },
        { id: "4", name: "رعب", nameAr: "رعب", slug: "horror" },
        { id: "5", name: "إثارة", nameAr: "إثارة", slug: "thriller" }
      ];
      res.json(fallbackTags);
    }
  });

  // Series endpoints
  app.get("/api/series", async (req, res) => {
    try {
      const series = await storage.getMoviesByCategory("series");
      res.json(series);
    } catch (error) {
      console.error("Get series error:", error);
      res.status(500).json({ message: "خطأ في استرجاع المسلسلات" });
    }
  });

  // Get single movie/series/show by ID
  app.get("/api/movies/:id", async (req, res) => {
    try {
      const movie = await storage.getMovieById(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: "المحتوى غير موجود" });
      }
      
      // Update view count
      await storage.updateMovieViews(req.params.id);
      res.json(movie);
    } catch (error) {
      console.error("Get movie by ID error:", error);
      res.status(500).json({ error: "خطأ في جلب تفاصيل المحتوى" });
    }
  });

  app.get("/api/series/:id", async (req, res) => {
    try {
      const series = await storage.getMovieById(req.params.id);
      if (!series || series.category !== "series") {
        return res.status(404).json({ message: "المسلسل غير موجود" });
      }
      
      // Update view count
      await storage.updateMovieViews(req.params.id);
      res.json(series);
    } catch (error) {
      console.error("Get series error:", error);
      res.status(500).json({ message: "خطأ في استرجاع المسلسل" });
    }
  });

  // Shows endpoints
  app.get("/api/shows", async (req, res) => {
    try {
      const shows = await storage.getMoviesByCategory("show");
      res.json(shows);
    } catch (error) {
      console.error("Get shows error:", error);
      res.status(500).json({ message: "خطأ في استرجاع البرامج" });
    }
  });

  app.get("/api/shows/:id", async (req, res) => {
    try {
      const show = await storage.getMovieById(req.params.id);
      if (!show || show.category !== "show") {
        return res.status(404).json({ message: "البرنامج غير موجود" });
      }
      
      // Update view count
      await storage.updateMovieViews(req.params.id);
      res.json(show);
    } catch (error) {
      console.error("Get show error:", error);
      res.status(500).json({ message: "خطأ في استرجاع البرنامج" });
    }
  });

  // Episodes endpoints
  app.get("/api/series/:seriesId/episodes", async (req, res) => {
    try {
      const episodes = await storage.getEpisodesBySeriesId(req.params.seriesId);
      res.json(episodes);
    } catch (error) {
      console.error("Get episodes error:", error);
      res.json([]); // Return empty array as fallback
    }
  });

  app.get("/api/episodes/:id", async (req, res) => {
    try {
      const episode = await storage.getEpisodeById(req.params.id);
      if (!episode) {
        return res.status(404).json({ message: "الحلقة غير موجودة" });
      }
      res.json(episode);
    } catch (error) {
      console.error("Get episode error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الحلقة" });
    }
  });

  // People endpoints
  app.get("/api/people", async (req, res) => {
    try {
      const { search, profession } = req.query;
      const people = await storage.searchPeople(search as string, profession as string);
      res.json(people);
    } catch (error) {
      console.error("Search people error:", error);
      res.json([]); // Return empty array as fallback
    }
  });

  app.get("/api/people/:id", async (req, res) => {
    try {
      // First try to get from storage
      let person = await storage.getPersonById(req.params.id);
      
      // If not found in storage, try to fetch from TMDB
      if (!person) {
        try {
          // For now, return a 404 as TMDB person API is not implemented yet
          const tmdbPerson = null;
          if (tmdbPerson) {
            // Convert TMDB data to our format and store it
            // This code is commented out since tmdbPerson is null
            // const personData = {
            //   name: tmdbPerson.name,
            //   arabicName: tmdbPerson.name,
            //   bio: tmdbPerson.biography || '',
            //   birthDate: tmdbPerson.birthday || '',
            //   nationality: tmdbPerson.place_of_birth || '',
            //   photo: tmdbPerson.profile_path || '',
            //   knownFor: tmdbPerson.known_for_department || '',
            //   popularity: tmdbPerson.popularity || 0
            // };
            
            // person = await storage.createPerson(personData);
          }
        } catch (tmdbError) {
          console.error("TMDB person fetch error:", tmdbError);
        }
      }
      
      if (!person) {
        return res.status(404).json({ message: "الشخص غير موجود" });
      }

      const movies = await storage.getPersonMovies(req.params.id);
      res.json({ ...person, movies });
    } catch (error) {
      console.error("Get person error:", error);
      res.status(500).json({ message: "خطأ في استرجاع بيانات الشخص" });
    }
  });

  // Comments endpoints
  app.get("/api/movies/:movieId/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByMovieId(req.params.movieId);
      res.json(comments);
    } catch (error) {
      console.error("Get comments error:", error);
      res.json([]); // Return empty array as fallback
    }
  });

  app.post("/api/movies/:movieId/comments", async (req, res) => {
    try {
      const commentData = {
        ...req.body,
        movieId: req.params.movieId
      };
      const comment = await storage.createComment(commentData);
      res.json({ success: true, comment });
    } catch (error) {
      console.error("Create comment error:", error);
      res.status(500).json({ message: "خطأ في إضافة التعليق" });
    }
  });

  app.patch("/api/comments/:id/like", async (req, res) => {
    try {
      const { isLike } = req.body;
      await storage.toggleCommentLike(req.params.id, isLike);
      res.json({ success: true });
    } catch (error) {
      console.error("Toggle comment like error:", error);
      res.status(500).json({ message: "خطأ في تسجيل الإعجاب" });
    }
  });

  app.patch("/api/comments/:id/dislike", async (req, res) => {
    try {
      await storage.toggleCommentLike(req.params.id, false);
      res.json({ success: true });
    } catch (error) {
      console.error("Toggle comment dislike error:", error);
      res.status(500).json({ message: "خطأ في تسجيل عدم الإعجاب" });
    }
  });

  // Favorites endpoints
  app.get("/api/users/:userId/favorites", async (req, res) => {
    try {
      const favorites = await storage.getUserFavorites(req.params.userId);
      res.json(favorites);
    } catch (error) {
      console.error("Get favorites error:", error);
      res.json([]);
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addToFavorites(validatedData);
      res.json({ success: true, favorite });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Add to favorites error:", error);
        res.status(500).json({ message: "خطأ في إضافة إلى المفضلة" });
      }
    }
  });

  app.delete("/api/favorites/:userId/:movieId", async (req, res) => {
    try {
      await storage.removeFromFavorites(req.params.userId, req.params.movieId);
      res.json({ success: true });
    } catch (error) {
      console.error("Remove from favorites error:", error);
      res.status(500).json({ message: "خطأ في إزالة من المفضلة" });
    }
  });

  app.get("/api/favorites/:userId/:movieId", async (req, res) => {
    try {
      const isFavorite = await storage.isFavorite(req.params.userId, req.params.movieId);
      res.json({ isFavorite });
    } catch (error) {
      console.error("Check favorite error:", error);
      res.json({ isFavorite: false });
    }
  });

  // Search endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const { q: searchQuery } = req.query;
      
      if (!searchQuery) {
        return res.json({ results: [], total: 0 });
      }

      const searchResults = await storage.searchMoviesAdvanced({
        search: searchQuery as string,
        limit: 20,
        offset: 0
      });

      res.json({
        results: searchResults.movies,
        total: searchResults.total
      });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "خطأ في البحث" });
    }
  });

  // Contact endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, message: "تم إرسال رسالتك بنجاح", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "بيانات غير صحيحة", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ success: false, message: "خطأ في إرسال الرسالة" });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الرسائل" });
    }
  });

  app.patch("/api/contacts/:id/read", async (req, res) => {
    try {
      await storage.markContactAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark contact as read error:", error);
      res.status(500).json({ message: "خطأ في تحديث حالة الرسالة" });
    }
  });

  // Notifications endpoints
  app.get("/api/users/:userId/notifications", async (req, res) => {
    try {
      const notifications = await storage.getUserNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.json([]);
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const validatedData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(validatedData);
      res.json({ success: true, notification });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Create notification error:", error);
        res.status(500).json({ message: "خطأ في إنشاء الإشعار" });
      }
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark notification as read error:", error);
      res.status(500).json({ message: "خطأ في تحديث حالة الإشعار" });
    }
  });

  // User registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
      }

      const user = await storage.createUser(validatedData);
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Registration error:", error);
        res.status(500).json({ message: "خطأ في التسجيل" });
      }
    }
  });

  // Admin Dashboard API endpoints
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const allMovies = await storage.getAllMovies();
      const allContacts = await storage.getAllContacts();
      const stats = {
        totalMovies: allMovies.length,
        totalUsers: 15, // قيمة افتراضية
        totalContacts: allContacts.length,
        recentMovies: 12 // الأفلام المضافة هذا الشهر
      };
      res.json(stats);
    } catch (error) {
      console.error("Admin stats error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الإحصائيات" });
    }
  });

  // Admin Users Management
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = [
        { id: "1", username: "admin", email: "admin@yemenflix.com", role: "admin", createdAt: new Date() },
        { id: "2", username: "user1", email: "user1@example.com", role: "user", createdAt: new Date() }
      ];
      res.json({ users });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "خطأ في استرجاع المستخدمين" });
    }
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    try {
      // تم حذف المستخدم (محاكاة)
      res.json({ success: true });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "خطأ في حذف المستخدم" });
    }
  });

  // Admin Movies Management  
  app.delete("/api/admin/movies/:id", async (req, res) => {
    try {
      // تم حذف الفيلم (محاكاة)
      res.json({ success: true });
    } catch (error) {
      console.error("Delete movie error:", error);
      res.status(500).json({ message: "خطأ في حذف الفيلم" });
    }
  });

  // TMDB Integration endpoints
  app.get("/api/tmdb/popular-movies", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const movies = await tmdbService.getPopularMovies(page);
      res.json(movies);
    } catch (error) {
      console.error("TMDB popular movies error:", error);
      res.status(500).json({ message: "خطأ في جلب الأفلام الشائعة" });
    }
  });

  app.get("/api/tmdb/movie/:id", async (req, res) => {
    try {
      const movieId = parseInt(req.params.id);
      const movie = await tmdbService.getMovieDetails(movieId);
      const convertedMovie = tmdbService.convertTMDBMovieToDBFormat(movie);
      res.json(convertedMovie);
    } catch (error) {
      console.error("TMDB movie details error:", error);
      res.status(500).json({ message: "خطأ في جلب تفاصيل الفيلم" });
    }
  });

  app.get("/api/tmdb/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      const page = parseInt(req.query.page as string) || 1;
      
      if (!query) {
        return res.status(400).json({ message: "مطلوب نص البحث" });
      }

      const results = await tmdbService.searchMovies(query, page);
      res.json(results);
    } catch (error) {
      console.error("TMDB search error:", error);
      res.status(500).json({ message: "خطأ في البحث" });
    }
  });

  // Data population endpoints (للإدارة)
  app.post("/api/admin/populate-movies", async (req, res) => {
    try {
      await dataPopulationService.populateMovies();
      res.json({ success: true, message: "تم تعبئة الأفلام بنجاح" });
    } catch (error) {
      console.error("Populate movies error:", error);
      res.status(500).json({ message: "خطأ في تعبئة الأفلام" });
    }
  });

  app.post("/api/admin/populate-tv", async (req, res) => {
    try {
      await dataPopulationService.populateTVShows();
      res.json({ success: true, message: "تم تعبئة المسلسلات بنجاح" });
    } catch (error) {
      console.error("Populate TV shows error:", error);
      res.status(500).json({ message: "خطأ في تعبئة المسلسلات" });
    }
  });

  app.post("/api/admin/populate-all", async (req, res) => {
    try {
      await dataPopulationService.populateAll();
      res.json({ success: true, message: "تم تعبئة قاعدة البيانات بنجاح" });
    } catch (error) {
      console.error("Populate all error:", error);
      res.status(500).json({ message: "خطأ في تعبئة قاعدة البيانات" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "YEMEN_FLIX API is running" });
  });

  // Register admin routes
  app.use("/api", adminRoutes);

  const server = createServer(app);
  return server;
}