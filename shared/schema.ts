import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  joinDate: timestamp("join_date").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const movies = pgTable("movies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  originalTitle: text("original_title"),
  description: text("description").notNull(),
  year: integer("year").notNull(),
  duration: integer("duration"), // in minutes
  rating: real("rating"), // 0-10
  genre: text("genre").array().notNull(),
  poster: text("poster").notNull(),
  backdrop: text("backdrop"),
  trailer: text("trailer"),
  quality: text("quality").notNull(), // HD, 4K, etc
  language: text("language").notNull(),
  subtitle: text("subtitle").array(),
  category: text("category").notNull(), // movie, series, show, mix
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  viewCount: integer("view_count").default(0),
  addedDate: timestamp("added_date").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  movieId: varchar("movie_id").references(() => movies.id).notNull(),
  addedDate: timestamp("added_date").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  avatar: true,
});

export const insertMovieSchema = createInsertSchema(movies).pick({
  title: true,
  originalTitle: true,
  description: true,
  year: true,
  duration: true,
  rating: true,
  genre: true,
  poster: true,
  backdrop: true,
  trailer: true,
  quality: true,
  language: true,
  subtitle: true,
  category: true,
  isNew: true,
  isFeatured: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  userId: true,
  movieId: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  title: true,
  message: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof movies.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
