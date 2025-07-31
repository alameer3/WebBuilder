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
    // Sample movies data from the original design
    const sampleMovies: InsertMovie[] = [
      {
        title: "28 Years Later",
        description: "الجزء الثالث من سلسلة أفلام الزومبي المثيرة",
        year: 2025,
        duration: 115,
        rating: 7.1,
        genre: ["اثارة", "رعب"],
        poster: "https://img.downet.net/thumb/178x260/uploads/Gn5bw.webp",
        quality: "WEB-DL",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: true
      },
      {
        title: "The Life of Chuck",
        description: "قصة ملهمة عن رجل يواجه تحديات الحياة بشجاعة",
        year: 2025,
        duration: 110,
        rating: 7.7,
        genre: ["فانتازيا", "دراما"],
        poster: "https://img.downet.net/thumb/178x260/uploads/BV1RS.webp",
        quality: "WEB-DL",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: false
      },
      {
        title: "The Dogs",
        description: "فيلم اثارة ورعب مشوق",
        year: 2025,
        duration: 105,
        rating: 5.8,
        genre: ["اثارة", "رعب"],
        poster: "https://img.downet.net/thumb/178x260/uploads/oSJ7Y.webp",
        quality: "WEB-DL",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: false
      },
      {
        title: "The Monster Beneath Us",
        description: "فيلم رعب واثارة مخيف",
        year: 2024,
        duration: 95,
        rating: 5.4,
        genre: ["اثارة", "رعب"],
        poster: "https://img.downet.net/thumb/178x260/uploads/jXyXQ.webp",
        quality: "WEB-DL",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: true,
        isFeatured: false
      },
      {
        title: "Venom: The Last Dance",
        description: "فيلم اكشن مثير من مارفل",
        year: 2024,
        duration: 130,
        rating: 6.0,
        genre: ["اكشن", "مغامرة"],
        poster: "https://img.downet.net/thumb/178x260/uploads/pv9vE.webp",
        quality: "WEB-DL",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: true
      },
      {
        title: "OSIRIS",
        description: "فيلم خيال علمي متقدم",
        year: 2024,
        duration: 125,
        rating: 6.5,
        genre: ["خيال علمي", "اثارة"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=OSIRIS",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "Decided",
        description: "فيلم دراما اجتماعية",
        year: 2024,
        duration: 118,
        rating: 6.8,
        genre: ["دراما"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=Decided",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "Happy Gilmore 2",
        description: "كوميديا رياضية مضحكة",
        year: 2024,
        duration: 102,
        rating: 7.2,
        genre: ["كوميدي", "رياضي"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=Happy+Gilmore+2",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "Normal",
        description: "فيلم دراما نفسية عميقة",
        year: 2024,
        duration: 108,
        rating: 6.3,
        genre: ["دراما"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=Normal",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "The Cleaner",
        description: "فيلم اثارة وجريمة",
        year: 2024,
        duration: 112,
        rating: 6.7,
        genre: ["جريمة", "اثارة"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=The+Cleaner",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "Little Monster",
        description: "فيلم رعب للأطفال",
        year: 2024,
        duration: 88,
        rating: 5.5,
        genre: ["اطفال", "رعب"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=Little+Monster",
        quality: "HD",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
        isFeatured: false
      },
      {
        title: "Wicked",
        description: "فيلم موسيقي رائع",
        year: 2024,
        duration: 145,
        rating: 7.8,
        genre: ["موسيقى", "فانتازيا"],
        poster: "https://via.placeholder.com/178x260/333/fff?text=Wicked",
        quality: "4K",
        language: "إنجليزي",
        subtitle: ["عربي"],
        category: "movie",
        isNew: false,
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
      avatar: insertUser.avatar || null,
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
      originalTitle: insertMovie.originalTitle || null,
      duration: insertMovie.duration || null,
      rating: insertMovie.rating || null,
      backdrop: insertMovie.backdrop || null,
      trailer: insertMovie.trailer || null,
      subtitle: insertMovie.subtitle || [],
      isNew: insertMovie.isNew || false,
      isFeatured: insertMovie.isFeatured || false,
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
