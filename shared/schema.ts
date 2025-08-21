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
  imdbRating: real("imdb_rating"), // IMDB rating
  tmdbRating: real("tmdb_rating"), // TMDB rating
  genre: text("genre").array().notNull(),
  tags: text("tags").array(),
  poster: text("poster").notNull(),
  backdrop: text("backdrop"),
  trailer: text("trailer"),
  quality: text("quality").notNull(), // HD, 4K, etc
  language: text("language").notNull(),
  subtitle: text("subtitle").array(),
  category: text("category").notNull(), // movie, series, show, mix
  section: text("section"), // مدبلج, مترجم, عربي, أجنبي, خليجي
  country: text("country"),
  director: text("director").array(),
  cast: text("cast").array(), // JSON stringified array of objects with name, character, profile_path
  writer: text("writer").array(),
  producer: text("producer").array(),
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  isRecommended: boolean("is_recommended").default(false),
  viewCount: integer("view_count").default(0),
  downloadCount: integer("download_count").default(0),
  likeCount: integer("like_count").default(0),
  dislikeCount: integer("dislike_count").default(0),
  addedDate: timestamp("added_date").defaultNow(),
  updatedDate: timestamp("updated_date").defaultNow(),
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

// Series Episodes Table
export const episodes = pgTable("episodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  seriesId: varchar("series_id").references(() => movies.id).notNull(),
  episodeNumber: integer("episode_number").notNull(),
  seasonNumber: integer("season_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  duration: integer("duration"),
  poster: text("poster"),
  videoUrl: text("video_url"),
  downloadLinks: text("download_links").array(),
  watchCount: integer("watch_count").default(0),
  addedDate: timestamp("added_date").defaultNow(),
});

// Categories Table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  type: text("type").notNull(), // movie, series, show, mix
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
});

// Tags Table
export const tags = pgTable("tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  slug: text("slug").notNull().unique(),
  count: integer("count").default(0),
  isActive: boolean("is_active").default(true),
});

// People Table (Actors, Directors, etc.)
export const people = pgTable("people", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  biography: text("biography"),
  birthDate: text("birth_date"),
  nationality: text("nationality"),
  photo: text("photo"),
  profession: text("profession").array(), // actor, director, writer, producer
  isActive: boolean("is_active").default(true),
  addedDate: timestamp("added_date").defaultNow(),
});

// Movie-People Relationship
export const moviePeople = pgTable("movie_people", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  movieId: varchar("movie_id").references(() => movies.id).notNull(),
  personId: varchar("person_id").references(() => people.id).notNull(),
  role: text("role").notNull(), // actor, director, writer, producer
  character: text("character"), // character name for actors
});

// Comments/Reviews Table
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  movieId: varchar("movie_id").references(() => movies.id).notNull(),
  content: text("content").notNull(),
  rating: integer("rating"), // 1-5 stars
  isApproved: boolean("is_approved").default(false),
  likeCount: integer("like_count").default(0),
  dislikeCount: integer("dislike_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Search History Table
export const searchHistory = pgTable("search_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  query: text("query").notNull(),
  filters: text("filters"), // JSON string of applied filters
  resultCount: integer("result_count").default(0),
  searchDate: timestamp("search_date").defaultNow(),
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
  imdbRating: true,
  tmdbRating: true,
  genre: true,
  tags: true,
  poster: true,
  backdrop: true,
  trailer: true,
  quality: true,
  language: true,
  subtitle: true,
  category: true,
  section: true,
  country: true,
  director: true,
  cast: true,
  writer: true,
  producer: true,
});

export const insertEpisodeSchema = createInsertSchema(episodes).pick({
  seriesId: true,
  episodeNumber: true,
  seasonNumber: true,
  title: true,
  description: true,
  duration: true,
  poster: true,
  videoUrl: true,
  downloadLinks: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  nameAr: true,
  slug: true,
  description: true,
  type: true,
  sortOrder: true,
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
  nameAr: true,
  slug: true,
});

export const insertPersonSchema = createInsertSchema(people).pick({
  name: true,
  nameAr: true,
  biography: true,
  birthDate: true,
  nationality: true,
  photo: true,
  profession: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  userId: true,
  movieId: true,
  content: true,
  rating: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type Movie = typeof movies.$inferSelect;
export type Episode = typeof episodes.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type Person = typeof people.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
