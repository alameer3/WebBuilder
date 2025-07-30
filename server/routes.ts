import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save contact message
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

  // Get all contacts endpoint (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        message: "خطأ في استرجاع الرسائل" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
