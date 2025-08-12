import type { IStorage, SearchFilters } from "./storage-db";
import type {
  User,
  Movie,
  Episode,
  Category,
  Tag,
  Person,
  Comment,
  Favorite,
  Contact,
  Notification,
  InsertUser,
  InsertMovie,
  InsertEpisode,
  InsertCategory,
  InsertTag,
  InsertPerson,
  InsertComment,
  InsertFavorite,
  InsertContact,
  InsertNotification,
} from "@shared/schema";

export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private movies: Movie[] = [];
  private episodes: Episode[] = [];
  private categories: Category[] = [];
  private tags: Tag[] = [];
  private people: Person[] = [];
  private comments: Comment[] = [];
  private favorites: Favorite[] = [];
  private contacts: Contact[] = [];
  private notifications: Notification[] = [];

  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private initializeSampleData() {
    // Add some sample movies
    const sampleMovies: Movie[] = [
      {
        id: this.generateId(),
        title: "The Dark Knight",
        originalTitle: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        year: 2008,
        duration: 152,
        rating: 9.0,
        imdbRating: 9.0,
        tmdbRating: 8.5,
        genre: ["Action", "Crime", "Drama"],
        tags: ["superhero", "batman", "joker"],
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop: "https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        quality: "HD",
        language: "English",
        subtitle: ["Arabic", "English"],
        category: "movie",
        section: "مترجم",
        country: "USA",
        director: ["Christopher Nolan"],
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        writer: ["Jonathan Nolan", "Christopher Nolan"],
        producer: ["Emma Thomas", "Christopher Nolan", "Charles Roven"],
        isNew: false,
        isFeatured: true,
        isRecommended: true,
        viewCount: 150000,
        downloadCount: 50000,
        likeCount: 12000,
        dislikeCount: 500,
        addedDate: new Date(),
        updatedDate: new Date(),
      }
    ];

    this.movies.push(...sampleMovies);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user: User = {
      id: this.generateId(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || null,
      joinDate: new Date(),
      isActive: true,
    };
    this.users.set(user.id, user);
    return user;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).sort(
      (a, b) => b.addedDate.getTime() - a.addedDate.getTime()
    );
  }

  async getMovieById(id: string): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async searchMovies(
    search?: string,
    genre?: string,
    year?: number,
    category?: string
  ): Promise<Movie[]> {
    let results = Array.from(this.movies.values());

    if (search) {
      results = results.filter(
        movie =>
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      results = results.filter(movie => movie.genre.includes(genre));
    }

    if (year) {
      results = results.filter(movie => movie.year === year);
    }

    if (category) {
      results = results.filter(movie => movie.category === category);
    }

    return results;
  }

  async getFeaturedMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(movie => movie.isFeatured);
  }

  async getNewMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(movie => movie.isNew);
  }

  async getRecommendedMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(movie => movie.isRecommended);
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values())
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10);
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(
      movie => movie.category === category
    );
  }

  async createMovie(movieData: InsertMovie): Promise<Movie> {
    const movie: Movie = {
      id: this.generateId(),
      ...movieData,
      isNew: false,
      isFeatured: false,
      isRecommended: false,
      viewCount: 0,
      downloadCount: 0,
      likeCount: 0,
      dislikeCount: 0,
      addedDate: new Date(),
      updatedDate: new Date(),
    };
    this.movies.set(movie.id, movie);
    return movie;
  }

  async incrementMovieViews(id: string): Promise<void> {
    const movie = this.movies.get(id);
    if (movie) {
      movie.viewCount = (movie.viewCount || 0) + 1;
      this.movies.set(id, movie);
    }
  }

  // Episode methods
  async getEpisodesBySeriesId(seriesId: string): Promise<Episode[]> {
    return Array.from(this.episodes.values()).filter(
      episode => episode.seriesId === seriesId
    );
  }

  async getEpisodeById(id: string): Promise<Episode | undefined> {
    return this.episodes.get(id);
  }

  async createEpisode(episodeData: InsertEpisode): Promise<Episode> {
    const episode: Episode = {
      id: this.generateId(),
      ...episodeData,
      watchCount: 0,
      addedDate: new Date(),
    };
    this.episodes.set(episode.id, episode);
    return episode;
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(categoryData: InsertCategory): Promise<Category> {
    const category: Category = {
      id: this.generateId(),
      ...categoryData,
      isActive: true,
      sortOrder: categoryData.sortOrder || 0,
    };
    this.categories.set(category.id, category);
    return category;
  }

  // Tag methods
  async getAllTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagById(id: string): Promise<Tag | undefined> {
    return this.tags.get(id);
  }

  async createTag(tagData: InsertTag): Promise<Tag> {
    const tag: Tag = {
      id: this.generateId(),
      ...tagData,
      count: 0,
      isActive: true,
    };
    this.tags.set(tag.id, tag);
    return tag;
  }

  // People methods
  async searchPeople(search?: string, profession?: string): Promise<Person[]> {
    let results = Array.from(this.people.values());

    if (search) {
      results = results.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (profession) {
      results = results.filter(person =>
        person.profession.includes(profession)
      );
    }

    return results;
  }

  async getPersonById(id: string): Promise<Person | undefined> {
    return this.people.get(id);
  }

  async getPersonMovies(personId: string): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(movie =>
      movie.cast.includes(personId) ||
      movie.director.includes(personId) ||
      movie.writer.includes(personId) ||
      movie.producer.includes(personId)
    );
  }

  async createPerson(personData: InsertPerson): Promise<Person> {
    const person: Person = {
      id: this.generateId(),
      ...personData,
      isActive: true,
      addedDate: new Date(),
    };
    this.people.set(person.id, person);
    return person;
  }

  // Comments methods
  async getCommentsByMovieId(movieId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      comment => comment.movieId === movieId
    );
  }

  async createComment(commentData: InsertComment): Promise<Comment> {
    const comment: Comment = {
      id: this.generateId(),
      ...commentData,
      isApproved: false,
      likeCount: 0,
      dislikeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comments.set(comment.id, comment);
    return comment;
  }

  async toggleCommentLike(commentId: string, isLike: boolean): Promise<void> {
    const comment = this.comments.get(commentId);
    if (comment) {
      if (isLike) {
        comment.likeCount = (comment.likeCount || 0) + 1;
      } else {
        comment.dislikeCount = (comment.dislikeCount || 0) + 1;
      }
      this.comments.set(commentId, comment);
    }
  }

  // Favorites methods
  async getUserFavorites(userId: string): Promise<(Movie & { addedDate: Date })[]> {
    const userFavorites = Array.from(this.favorites.values()).filter(
      fav => fav.userId === userId
    );
    
    return userFavorites.map(fav => {
      const movie = this.movies.get(fav.movieId);
      if (movie) {
        return { ...movie, addedDate: fav.addedDate || new Date() };
      }
      return null;
    }).filter(Boolean) as (Movie & { addedDate: Date })[];
  }

  async addToFavorites(favoriteData: InsertFavorite): Promise<Favorite> {
    const favorite: Favorite = {
      id: this.generateId(),
      ...favoriteData,
      addedDate: new Date(),
    };
    this.favorites.set(favorite.id, favorite);
    return favorite;
  }

  async removeFromFavorites(userId: string, movieId: string): Promise<void> {
    for (const [id, favorite] of this.favorites.entries()) {
      if (favorite.userId === userId && favorite.movieId === movieId) {
        this.favorites.delete(id);
        break;
      }
    }
  }

  async isFavorite(userId: string, movieId: string): Promise<boolean> {
    for (const favorite of this.favorites.values()) {
      if (favorite.userId === userId && favorite.movieId === movieId) {
        return true;
      }
    }
    return false;
  }

  // Contact methods
  async createContact(contactData: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.generateId(),
      ...contactData,
      isRead: false,
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
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
    return Array.from(this.notifications.values()).filter(
      notification => notification.userId === userId
    );
  }

  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const notification: Notification = {
      id: this.generateId(),
      ...notificationData,
      isRead: false,
      createdAt: new Date(),
    };
    this.notifications.set(notification.id, notification);
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