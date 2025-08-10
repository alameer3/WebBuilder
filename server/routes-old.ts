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

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Movies endpoints with advanced search
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
      const movie = await storage.getMovieById(req.params.id);
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

  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const { type } = req.query;
      const categories = await storage.getCategories(type as string);
      res.json(categories);
    } catch (error) {
      console.error("Get categories error:", error);
      res.status(500).json({ message: "خطأ في استرجاع التصنيفات" });
    }
  });

  // Tags endpoints
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getTags();
      res.json(tags);
    } catch (error) {
      console.error("Get tags error:", error);
      res.status(500).json({ message: "خطأ في استرجاع العلامات" });
    }
  });

  // Episodes endpoints
  app.get("/api/episodes", async (req, res) => {
    try {
      const { seriesId } = req.query;
      if (!seriesId) {
        return res.status(400).json({ message: "معرف المسلسل مطلوب" });
      }
      
      const episodes = await storage.getEpisodesBySeriesId(seriesId as string);
      res.json(episodes);
    } catch (error) {
      console.error("Get episodes error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الحلقات" });
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
      console.error("Get people error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الأشخاص" });
    }
  });

  app.get("/api/people/:id", async (req, res) => {
    try {
      const person = await storage.getPersonById(req.params.id);
      if (!person) {
        return res.status(404).json({ message: "الشخص غير موجود" });
      }
      
      const personMovies = await storage.getPersonMovies(req.params.id);
      res.json({ ...person, movies: personMovies });
    } catch (error) {
      console.error("Get person error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الشخص" });
    }
  });

  // Comments endpoints
  app.get("/api/comments", async (req, res) => {
    try {
      const { movieId } = req.query;
      if (!movieId) {
        return res.status(400).json({ message: "معرف الفيلم مطلوب" });
      }
      
      const comments = await storage.getCommentsByMovieId(movieId as string);
      res.json(comments);
    } catch (error) {
      console.error("Get comments error:", error);
      res.status(500).json({ message: "خطأ في استرجاع التعليقات" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      // For now, we'll use a dummy user ID
      // In a real app, this would come from authentication
      const userId = "dummy-user-id";
      
      const commentData = {
        ...req.body,
        userId
      };
      
      const comment = await storage.createComment(commentData);
      res.json({ success: true, comment });
    } catch (error) {
      console.error("Create comment error:", error);
      res.status(500).json({ message: "خطأ في إنشاء التعليق" });
    }
  });

  app.post("/api/comments/:id/like", async (req, res) => {
    try {
      await storage.toggleCommentLike(req.params.id, true);
      res.json({ success: true });
    } catch (error) {
      console.error("Like comment error:", error);
      res.status(500).json({ message: "خطأ في الإعجاب بالتعليق" });
    }
  });

  app.post("/api/comments/:id/unlike", async (req, res) => {
    try {
      await storage.toggleCommentLike(req.params.id, false);
      res.json({ success: true });
    } catch (error) {
      console.error("Unlike comment error:", error);
      res.status(500).json({ message: "خطأ في إلغاء الإعجاب بالتعليق" });
    }
  });

  // User endpoints
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username) || 
                          await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "المستخدم موجود بالفعل" });
      }
      
      const user = await storage.createUser(validatedData);
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Create user error:", error);
        res.status(500).json({ message: "خطأ في إنشاء المستخدم" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
      }
      res.json({ id: user.id, username: user.username, email: user.email, avatar: user.avatar });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "خطأ في استرجاع المستخدم" });
    }
  });

  // Favorites endpoints
  app.get("/api/users/:userId/favorites", async (req, res) => {
    try {
      const favorites = await storage.getUserFavorites(req.params.userId);
      res.json(favorites);
    } catch (error) {
      console.error("Get favorites error:", error);
      res.status(500).json({ message: "خطأ في استرجاع المفضلة" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      
      // Check if already favorited
      const isFav = await storage.isFavorite(validatedData.userId, validatedData.movieId);
      if (isFav) {
        return res.status(400).json({ message: "الفيلم موجود في المفضلة بالفعل" });
      }
      
      const favorite = await storage.addToFavorites(validatedData);
      res.json({ success: true, favorite });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "بيانات غير صحيحة", errors: error.errors });
      } else {
        console.error("Add favorite error:", error);
        res.status(500).json({ message: "خطأ في إضافة للمفضلة" });
      }
    }
  });

  app.delete("/api/favorites/:userId/:movieId", async (req, res) => {
    try {
      await storage.removeFromFavorites(req.params.userId, req.params.movieId);
      res.json({ success: true, message: "تم حذف الفيلم من المفضلة" });
    } catch (error) {
      console.error("Remove favorite error:", error);
      res.status(500).json({ message: "خطأ في حذف من المفضلة" });
    }
  });

  app.get("/api/favorites/:userId/:movieId", async (req, res) => {
    try {
      const isFavorite = await storage.isFavorite(req.params.userId, req.params.movieId);
      res.json({ isFavorite });
    } catch (error) {
      console.error("Check favorite error:", error);
      res.status(500).json({ message: "خطأ في فحص المفضلة" });
    }
  });

  // Notifications endpoints
  app.get("/api/users/:userId/notifications", async (req, res) => {
    try {
      const notifications = await storage.getUserNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ message: "خطأ في استرجاع الإشعارات" });
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
      res.json({ success: true, message: "تم تحديث الإشعار" });
    } catch (error) {
      console.error("Mark notification read error:", error);
      res.status(500).json({ message: "خطأ في تحديث الإشعار" });
    }
  });

  // Contact endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.json({ 
        success: true, 
        message: "تم إرسال رسالتك بنجاح",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "بيانات غير صحيحة", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          message: "خطأ في الخادم، يرجى المحاولة مرة أخرى" 
        });
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
      res.json({ success: true, message: "تم تحديث الرسالة" });
    } catch (error) {
      console.error("Mark contact read error:", error);
      res.status(500).json({ message: "خطأ في تحديث الرسالة" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
