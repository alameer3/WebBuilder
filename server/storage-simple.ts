import type { IStorage, SearchFilters } from "./storage-db";
import type {
  User, Movie, Episode, Category, Tag, Person, Comment, Favorite, Contact, Notification,
  InsertUser, InsertMovie, InsertEpisode, InsertCategory, InsertTag, InsertPerson,
  InsertComment, InsertFavorite, InsertContact, InsertNotification,
} from "@shared/schema";

export class SimpleMemoryStorage implements IStorage {
  private data = {
    users: [] as User[],
    movies: [] as Movie[],
    episodes: [] as Episode[],
    categories: [] as Category[],
    tags: [] as Tag[],
    people: [] as Person[],
    comments: [] as Comment[],
    favorites: [] as Favorite[],
    contacts: [] as Contact[],
    notifications: [] as Notification[],
  };

  constructor() {
    // Add sample data
    this.data.movies.push({
      id: "1",
      title: "The Dark Knight",
      originalTitle: "The Dark Knight",
      description: "Batman faces his greatest challenge yet",
      year: 2008,
      duration: 152,
      rating: 9.0,
      imdbRating: 9.0,
      tmdbRating: 8.5,
      genre: ["Action", "Crime", "Drama"],
      tags: ["superhero", "batman"],
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      backdrop: null,
      trailer: null,
      quality: "HD",
      language: "English",
      subtitle: ["Arabic"],
      category: "movie",
      section: "مترجم",
      country: "USA",
      director: ["Christopher Nolan"],
      cast: ["Christian Bale", "Heath Ledger"],
      writer: ["Christopher Nolan"],
      producer: ["Emma Thomas"],
      isNew: false,
      isFeatured: true,
      isRecommended: true,
      viewCount: 1500,
      downloadCount: 500,
      likeCount: 120,
      dislikeCount: 5,
      addedDate: new Date(),
      updatedDate: new Date(),
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.data.users.find(u => u.id === id);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.data.users.find(u => u.username === username);
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.data.users.find(u => u.email === email);
  }
  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.generateId(),
      ...user,
      joinDate: new Date(),
      isActive: true
    };
    this.data.users.push(newUser);
    return newUser;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return this.data.movies.slice().sort((a, b) => (b.addedDate?.getTime() || 0) - (a.addedDate?.getTime() || 0));
  }
  async getMovieById(id: string): Promise<Movie | undefined> {
    return this.data.movies.find(m => m.id === id);
  }
  async getMoviesByCategory(category: string): Promise<Movie[]> {
    return this.data.movies.filter(m => m.category === category);
  }
  async getFeaturedMovies(): Promise<Movie[]> {
    return this.data.movies.filter(m => m.isFeatured);
  }
  async getNewMovies(): Promise<Movie[]> {
    return this.data.movies.filter(m => m.isNew);
  }
  async searchMovies(query: string): Promise<Movie[]> {
    return this.data.movies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  async searchMoviesAdvanced(filters: SearchFilters): Promise<{ movies: Movie[]; total: number }> {
    let results = this.data.movies;
    
    if (filters.search) {
      results = results.filter(m => 
        m.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        m.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters.category) {
      results = results.filter(m => m.category === filters.category);
    }
    
    if (filters.genre && filters.genre.length > 0) {
      results = results.filter(m => filters.genre!.some(g => m.genre.includes(g)));
    }

    const total = results.length;
    const offset = filters.offset || 0;
    const limit = filters.limit || 50;
    
    return {
      movies: results.slice(offset, offset + limit),
      total
    };
  }
  async createMovie(movie: InsertMovie): Promise<Movie> {
    const newMovie: Movie = {
      id: this.generateId(),
      ...movie,
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
    this.data.movies.push(newMovie);
    return newMovie;
  }
  async updateMovieViews(id: string): Promise<void> {
    const movie = this.data.movies.find(m => m.id === id);
    if (movie) {
      movie.viewCount = (movie.viewCount || 0) + 1;
    }
  }

  // Episode methods
  async getEpisodesBySeriesId(seriesId: string): Promise<Episode[]> {
    return this.data.episodes.filter(e => e.seriesId === seriesId);
  }
  async getEpisodeById(id: string): Promise<Episode | undefined> {
    return this.data.episodes.find(e => e.id === id);
  }
  async createEpisode(episode: InsertEpisode): Promise<Episode> {
    const newEpisode: Episode = {
      id: this.generateId(),
      ...episode,
      watchCount: 0,
      addedDate: new Date(),
    };
    this.data.episodes.push(newEpisode);
    return newEpisode;
  }

  // Categories methods
  async getCategories(type?: string): Promise<Category[]> {
    let categories = this.data.categories;
    if (type) {
      categories = categories.filter(c => c.type === type);
    }
    return categories.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }
  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = {
      id: this.generateId(),
      ...category,
      isActive: true,
    };
    this.data.categories.push(newCategory);
    return newCategory;
  }

  // Tags methods
  async getTags(): Promise<Tag[]> {
    return this.data.tags;
  }
  async createTag(tag: InsertTag): Promise<Tag> {
    const newTag: Tag = {
      id: this.generateId(),
      ...tag,
      count: 0,
      isActive: true,
    };
    this.data.tags.push(newTag);
    return newTag;
  }

  // People methods
  async searchPeople(search?: string, profession?: string): Promise<Person[]> {
    let people = this.data.people;
    if (search) {
      people = people.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (profession) {
      people = people.filter(p => p.profession?.includes(profession));
    }
    return people;
  }
  async getPersonById(id: string): Promise<Person | undefined> {
    return this.data.people.find(p => p.id === id);
  }
  async getPersonMovies(personId: string): Promise<Movie[]> {
    return this.data.movies.filter(m => 
      m.cast.includes(personId) || 
      m.director.includes(personId) ||
      m.writer.includes(personId) ||
      m.producer.includes(personId)
    );
  }
  async createPerson(person: InsertPerson): Promise<Person> {
    const newPerson: Person = {
      id: this.generateId(),
      ...person,
      isActive: true,
      addedDate: new Date(),
    };
    this.data.people.push(newPerson);
    return newPerson;
  }

  // Comments methods
  async getCommentsByMovieId(movieId: string): Promise<Comment[]> {
    return this.data.comments.filter(c => c.movieId === movieId);
  }
  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      id: this.generateId(),
      ...comment,
      isApproved: false,
      likeCount: 0,
      dislikeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data.comments.push(newComment);
    return newComment;
  }
  async toggleCommentLike(commentId: string, isLike: boolean): Promise<void> {
    const comment = this.data.comments.find(c => c.id === commentId);
    if (comment) {
      if (isLike) {
        comment.likeCount = (comment.likeCount || 0) + 1;
      } else {
        comment.dislikeCount = (comment.dislikeCount || 0) + 1;
      }
    }
  }

  // Favorites methods
  async getUserFavorites(userId: string): Promise<(Movie & { addedDate: Date })[]> {
    const favorites = this.data.favorites.filter(f => f.userId === userId);
    return favorites.map(fav => {
      const movie = this.data.movies.find(m => m.id === fav.movieId);
      if (movie) {
        return { ...movie, addedDate: fav.addedDate || new Date() };
      }
      return null;
    }).filter(Boolean) as (Movie & { addedDate: Date })[];
  }
  async addToFavorites(favorite: InsertFavorite): Promise<Favorite> {
    const newFavorite: Favorite = {
      id: this.generateId(),
      ...favorite,
      addedDate: new Date(),
    };
    this.data.favorites.push(newFavorite);
    return newFavorite;
  }
  async removeFromFavorites(userId: string, movieId: string): Promise<void> {
    const index = this.data.favorites.findIndex(f => f.userId === userId && f.movieId === movieId);
    if (index !== -1) {
      this.data.favorites.splice(index, 1);
    }
  }
  async isFavorite(userId: string, movieId: string): Promise<boolean> {
    return this.data.favorites.some(f => f.userId === userId && f.movieId === movieId);
  }

  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      id: this.generateId(),
      ...contact,
      isRead: false,
      createdAt: new Date(),
    };
    this.data.contacts.push(newContact);
    return newContact;
  }
  async getAllContacts(): Promise<Contact[]> {
    return this.data.contacts.slice().sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async markContactAsRead(id: string): Promise<void> {
    const contact = this.data.contacts.find(c => c.id === id);
    if (contact) {
      contact.isRead = true;
    }
  }

  // Notification methods
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.data.notifications.filter(n => n.userId === userId);
  }
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const newNotification: Notification = {
      id: this.generateId(),
      ...notification,
      isRead: false,
      createdAt: new Date(),
    };
    this.data.notifications.push(newNotification);
    return newNotification;
  }
  async markNotificationAsRead(id: string): Promise<void> {
    const notification = this.data.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
  }
}