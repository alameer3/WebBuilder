import { 
  type User, type InsertUser, 
  type Contact, type InsertContact,
  type Movie, type InsertMovie,
  type Favorite, type InsertFavorite,
  type Notification, type InsertNotification
} from "@shared/schema";
import { randomUUID } from "crypto";

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
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovieViews(id: string): Promise<void>;
  
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private movies: Map<string, Movie>;
  private favorites: Map<string, Favorite>;
  private contacts: Map<string, Contact>;
  private notifications: Map<string, Notification>;

  constructor() {
    this.users = new Map();
    this.movies = new Map();
    this.favorites = new Map();
    this.contacts = new Map();
    this.notifications = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample movies data
    const sampleMovies: InsertMovie[] = [
      {
        title: "الكلاب",
        description: "فيلم درامي يحكي قصة مؤثرة عن الصداقة والولاء",
        year: 2024,
        duration: 120,
        rating: 8.5,
        genre: ["دراما", "أكشن"],
        poster: "/images/dogs-poster.jpg",
        backdrop: "/images/dogs-backdrop.jpg",
        quality: "4K",
        language: "عربي",
        subtitle: ["إنجليزي", "فرنسي"],
        category: "movie",
        isNew: true,
        isFeatured: true
      },
      {
        title: "حياة تشاك",
        originalTitle: "The Life of Chuck",
        description: "قصة ملهمة عن رجل يواجه تحديات الحياة بشجاعة",
        year: 2024,
        duration: 110,
        rating: 7.8,
        genre: ["دراما", "كوميديا"],
        poster: "/images/chuck-poster.jpg",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: false
      },
      {
        title: "28 سنة لاحقاً",
        originalTitle: "28 Years Later",
        description: "الجزء الثالث من سلسلة أفلام الزومبي المثيرة",
        year: 2024,
        duration: 115,
        rating: 8.2,
        genre: ["رعب", "إثارة"],
        poster: "/images/28years-poster.jpg",
        quality: "4K",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: true
      }
    ];

    for (const movie of sampleMovies) {
      await this.createMovie(movie);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      joinDate: new Date(),
      isActive: true
    };
    this.users.set(id, user);
    return user;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).sort(
      (a, b) => (b.addedDate?.getTime() || 0) - (a.addedDate?.getTime() || 0)
    );
  }

  async getMovieById(id: string): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(
      movie => movie.category === category
    );
  }

  async getFeaturedMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(
      movie => movie.isFeatured
    );
  }

  async getNewMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(
      movie => movie.isNew
    );
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.movies.values()).filter(
      movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(searchTerm)) ||
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = randomUUID();
    const movie: Movie = { 
      ...insertMovie, 
      id,
      viewCount: 0,
      addedDate: new Date()
    };
    this.movies.set(id, movie);
    return movie;
  }

  async updateMovieViews(id: string): Promise<void> {
    const movie = this.movies.get(id);
    if (movie) {
      movie.viewCount = (movie.viewCount || 0) + 1;
      this.movies.set(id, movie);
    }
  }

  // Favorites methods
  async getUserFavorites(userId: string): Promise<(Movie & { addedDate: Date })[]> {
    const userFavorites = Array.from(this.favorites.values()).filter(
      fav => fav.userId === userId
    );
    
    const moviesWithDates = userFavorites
      .map(fav => {
        const movie = this.movies.get(fav.movieId);
        return movie ? { ...movie, addedDate: fav.addedDate || new Date() } : null;
      })
      .filter((movie): movie is Movie & { addedDate: Date } => movie !== null);
    
    return moviesWithDates;
  }

  async addToFavorites(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      ...insertFavorite,
      id,
      addedDate: new Date()
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFromFavorites(userId: string, movieId: string): Promise<void> {
    const favoriteEntry = Array.from(this.favorites.entries()).find(
      ([, fav]) => fav.userId === userId && fav.movieId === movieId
    );
    if (favoriteEntry) {
      this.favorites.delete(favoriteEntry[0]);
    }
  }

  async isFavorite(userId: string, movieId: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(
      fav => fav.userId === userId && fav.movieId === movieId
    );
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async markContactAsRead(id: string): Promise<void> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.isRead = true;
      this.contacts.set(id, contact);
    }
  }

  // Notification methods
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notif => notif.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isRead = true;
      this.notifications.set(id, notification);
    }
  }
}

export const storage = new MemStorage();
