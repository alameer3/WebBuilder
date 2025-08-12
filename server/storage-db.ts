import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and, like, or, desc, asc, count, inArray, gte, lte, sql } from "drizzle-orm";
import { 
  users, movies, episodes, categories, tags, people, comments, favorites, 
  contacts, notifications, moviePeople 
} from "@shared/schema";
import type { 
  User, InsertUser, Movie, InsertMovie, Episode, InsertEpisode,
  Category, InsertCategory, Tag, InsertTag, Person, InsertPerson,
  Comment, InsertComment, Favorite, InsertFavorite, Contact, InsertContact,
  Notification, InsertNotification
} from "@shared/schema";

export interface SearchFilters {
  search?: string;
  category?: string;
  genre?: string[];
  yearMin?: number;
  yearMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  quality?: string[];
  language?: string[];
  section?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
  recent?: boolean;
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Movie methods
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie | undefined>;
  getMoviesByCategory(category: string): Promise<Movie[]>;
  getFeaturedMovies(): Promise<Movie[]>;
  getNewMovies(): Promise<Movie[]>;
  searchMovies(query: string): Promise<Movie[]>;
  searchMoviesAdvanced(filters: SearchFilters): Promise<{ movies: Movie[]; total: number }>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovieViews(id: string): Promise<void>;
  
  // Episodes methods
  getEpisodesBySeriesId(seriesId: string): Promise<Episode[]>;
  getEpisodeById(id: string): Promise<Episode | undefined>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
  
  // Categories methods
  getCategories(type?: string): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Tags methods
  getTags(): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // People methods
  searchPeople(search?: string, profession?: string): Promise<Person[]>;
  getPersonById(id: string): Promise<Person | undefined>;
  getPersonMovies(personId: string): Promise<Movie[]>;
  createPerson(person: InsertPerson): Promise<Person>;
  
  // Comments methods
  getCommentsByMovieId(movieId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  toggleCommentLike(commentId: string, isLike: boolean): Promise<void>;
  
  // Favorites methods
  getUserFavorites(userId: string): Promise<(Movie & { addedDate: Date })[]>;
  addToFavorites(favorite: InsertFavorite): Promise<Favorite>;
  removeFromFavorites(userId: string, movieId: string): Promise<void>;
  isFavorite(userId: string, movieId: string): Promise<boolean>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  markContactAsRead(id: string): Promise<void>;
  
  // Notification methods
  getUserNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is required");
    }
    const sql = neon(connectionString);
    this.db = drizzle(sql);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await this.db.insert(users).values(user).returning();
    return newUser;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return await this.db.select().from(movies).orderBy(desc(movies.addedDate));
  }

  async getMovieById(id: string): Promise<Movie | undefined> {
    const [movie] = await this.db.select().from(movies).where(eq(movies.id, id));
    return movie;
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    return await this.db.select().from(movies).where(eq(movies.category, category));
  }

  async getFeaturedMovies(): Promise<Movie[]> {
    return await this.db.select().from(movies)
      .where(eq(movies.isFeatured, true))
      .orderBy(desc(movies.addedDate))
      .limit(20);
  }

  async getNewMovies(): Promise<Movie[]> {
    return await this.db.select().from(movies)
      .where(eq(movies.isNew, true))
      .orderBy(desc(movies.addedDate))
      .limit(20);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    return await this.db.select().from(movies)
      .where(
        or(
          like(movies.title, `%${query}%`),
          like(movies.originalTitle, `%${query}%`),
          like(movies.description, `%${query}%`)
        )
      )
      .orderBy(desc(movies.rating));
  }

  async searchMoviesAdvanced(filters: SearchFilters): Promise<{ movies: Movie[]; total: number }> {
    let query = this.db.select().from(movies);
    let countQuery = this.db.select({ count: count() }).from(movies);
    
    const conditions: any[] = [];

    if (filters.search) {
      conditions.push(
        or(
          like(movies.title, `%${filters.search}%`),
          like(movies.originalTitle, `%${filters.search}%`),
          like(movies.description, `%${filters.search}%`)
        )
      );
    }

    if (filters.category) {
      conditions.push(eq(movies.category, filters.category));
    }

    if (filters.genre && filters.genre.length > 0) {
      conditions.push(sql`${movies.genre} && ${filters.genre}`);
    }

    if (filters.yearMin) {
      conditions.push(gte(movies.year, filters.yearMin));
    }

    if (filters.yearMax) {
      conditions.push(lte(movies.year, filters.yearMax));
    }

    if (filters.ratingMin) {
      conditions.push(gte(movies.rating, filters.ratingMin));
    }

    if (filters.ratingMax) {
      conditions.push(lte(movies.rating, filters.ratingMax));
    }

    if (filters.featured) {
      conditions.push(eq(movies.isFeatured, true));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
      countQuery = countQuery.where(and(...conditions)) as any;
    }

    // Sorting
    let orderBy;
    if (filters.sortBy === 'rating') {
      orderBy = filters.sortOrder === 'asc' ? asc(movies.rating) : desc(movies.rating);
    } else if (filters.sortBy === 'year') {
      orderBy = filters.sortOrder === 'asc' ? asc(movies.year) : desc(movies.year);
    } else if (filters.sortBy === 'title') {
      orderBy = filters.sortOrder === 'asc' ? asc(movies.title) : desc(movies.title);
    } else {
      orderBy = desc(movies.addedDate); // Default: newest first
    }

    query = query.orderBy(orderBy) as any;

    // Pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query = query.limit(limit).offset(offset) as any;

    const [moviesResult, totalResult] = await Promise.all([
      query,
      countQuery
    ]);

    return {
      movies: moviesResult as Movie[],
      total: totalResult[0]?.count || 0
    };
  }

  async createMovie(movie: InsertMovie): Promise<Movie> {
    const [newMovie] = await this.db.insert(movies).values(movie).returning();
    return newMovie;
  }

  async updateMovieViews(id: string): Promise<void> {
    await this.db
      .update(movies)
      .set({ 
        viewCount: sql`${movies.viewCount} + 1`
      })
      .where(eq(movies.id, id));
  }

  // Episodes methods
  async getEpisodesBySeriesId(seriesId: string): Promise<Episode[]> {
    return await this.db.select().from(episodes)
      .where(eq(episodes.seriesId, seriesId))
      .orderBy(asc(episodes.episodeNumber));
  }

  async getEpisodeById(id: string): Promise<Episode | undefined> {
    const [episode] = await this.db.select().from(episodes).where(eq(episodes.id, id));
    return episode;
  }

  async createEpisode(episode: InsertEpisode): Promise<Episode> {
    const [newEpisode] = await this.db.insert(episodes).values(episode).returning();
    return newEpisode;
  }

  // Categories methods
  async getCategories(type?: string): Promise<Category[]> {
    let query = this.db.select().from(categories);
    if (type) {
      query = query.where(eq(categories.type, type)) as any;
    }
    return await query.orderBy(asc(categories.sortOrder));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await this.db.insert(categories).values(category).returning();
    return newCategory;
  }

  // Tags methods
  async getTags(): Promise<Tag[]> {
    return await this.db.select().from(tags).orderBy(asc(tags.name));
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await this.db.insert(tags).values(tag).returning();
    return newTag;
  }

  // People methods
  async searchPeople(search?: string, profession?: string): Promise<Person[]> {
    let query = this.db.select().from(people);
    const conditions: any[] = [];

    if (search) {
      conditions.push(
        or(
          like(people.name, `%${search}%`),
          like(people.nameAr, `%${search}%`)
        )
      );
    }

    if (profession) {
      conditions.push(sql`${people.profession} && ARRAY[${profession}]`);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    return await query.orderBy(asc(people.name));
  }

  async getPersonById(id: string): Promise<Person | undefined> {
    const [person] = await this.db.select().from(people).where(eq(people.id, id));
    return person;
  }

  async getPersonMovies(personId: string): Promise<Movie[]> {
    return await this.db
      .select({
        id: movies.id,
        title: movies.title,
        originalTitle: movies.originalTitle,
        description: movies.description,
        year: movies.year,
        duration: movies.duration,
        rating: movies.rating,
        imdbRating: movies.imdbRating,
        tmdbRating: movies.tmdbRating,
        genre: movies.genre,
        tags: movies.tags,
        poster: movies.poster,
        backdrop: movies.backdrop,
        trailer: movies.trailer,
        quality: movies.quality,
        language: movies.language,
        subtitle: movies.subtitle,
        category: movies.category,
        section: movies.section,
        country: movies.country,
        director: movies.director,
        cast: movies.cast,
        writer: movies.writer,
        producer: movies.producer,
        isNew: movies.isNew,
        isFeatured: movies.isFeatured,
        isRecommended: movies.isRecommended,
        viewCount: movies.viewCount,
        downloadCount: movies.downloadCount,
        likeCount: movies.likeCount,
        dislikeCount: movies.dislikeCount,
        addedDate: movies.addedDate,
        updatedDate: movies.updatedDate
      })
      .from(movies)
      .innerJoin(moviePeople, eq(movies.id, moviePeople.movieId))
      .where(eq(moviePeople.personId, personId))
      .orderBy(desc(movies.year));
  }

  async createPerson(person: InsertPerson): Promise<Person> {
    const [newPerson] = await this.db.insert(people).values(person).returning();
    return newPerson;
  }

  // Comments methods
  async getCommentsByMovieId(movieId: string): Promise<Comment[]> {
    return await this.db.select().from(comments)
      .where(eq(comments.movieId, movieId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await this.db.insert(comments).values(comment).returning();
    return newComment;
  }

  async toggleCommentLike(commentId: string, isLike: boolean): Promise<void> {
    const field = isLike ? 'likeCount' : 'dislikeCount';
    await this.db
      .update(comments)
      .set({
        [field]: sql`${comments[field as keyof typeof comments]} + 1`
      })
      .where(eq(comments.id, commentId));
  }

  // Favorites methods
  async getUserFavorites(userId: string): Promise<(Movie & { addedDate: Date })[]> {
    return await this.db
      .select({
        id: movies.id,
        title: movies.title,
        originalTitle: movies.originalTitle,
        description: movies.description,
        year: movies.year,
        duration: movies.duration,
        rating: movies.rating,
        imdbRating: movies.imdbRating,
        tmdbRating: movies.tmdbRating,
        genre: movies.genre,
        tags: movies.tags,
        poster: movies.poster,
        backdrop: movies.backdrop,
        trailer: movies.trailer,
        quality: movies.quality,
        language: movies.language,
        subtitle: movies.subtitle,
        category: movies.category,
        section: movies.section,
        country: movies.country,
        director: movies.director,
        cast: movies.cast,
        writer: movies.writer,
        producer: movies.producer,
        isNew: movies.isNew,
        isFeatured: movies.isFeatured,
        isRecommended: movies.isRecommended,
        viewCount: movies.viewCount,
        downloadCount: movies.downloadCount,
        likeCount: movies.likeCount,
        dislikeCount: movies.dislikeCount,
        addedDate: favorites.addedDate,
        updatedDate: movies.updatedDate
      })
      .from(favorites)
      .innerJoin(movies, eq(favorites.movieId, movies.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.addedDate)) as any;
  }

  async addToFavorites(favorite: InsertFavorite): Promise<Favorite> {
    const [newFavorite] = await this.db.insert(favorites).values(favorite).returning();
    return newFavorite;
  }

  async removeFromFavorites(userId: string, movieId: string): Promise<void> {
    await this.db.delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.movieId, movieId)));
  }

  async isFavorite(userId: string, movieId: string): Promise<boolean> {
    const [favorite] = await this.db.select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.movieId, movieId)));
    return !!favorite;
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await this.db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async markContactAsRead(id: string): Promise<void> {
    await this.db
      .update(contacts)
      .set({ isRead: true })
      .where(eq(contacts.id, id));
  }

  // Notification methods
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await this.db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await this.db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await this.db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }
}