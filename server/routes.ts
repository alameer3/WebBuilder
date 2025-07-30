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
  
  // Movies endpoints
  app.get("/api/movies", async (req, res) => {
    try {
      const { category, featured, recent, search } = req.query;
      
      let movies;
      if (search) {
        movies = await storage.searchMovies(search as string);
      } else if (category) {
        movies = await storage.getMoviesByCategory(category as string);
      } else if (featured === 'true') {
        movies = await storage.getFeaturedMovies();
      } else if (recent === 'true') {
        movies = await storage.getNewMovies();
      } else {
        movies = await storage.getAllMovies();
      }
      
      res.json(movies);
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
