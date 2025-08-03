import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, Search, SlidersHorizontal, Grid, List } from "lucide-react";
import AdvancedSearch from "./AdvancedSearch";
import type { Movie } from "@shared/schema";

interface FilteredGridProps {
  endpoint: string;
  title?: string;
  initialFilters?: Record<string, any>;
  showSearch?: boolean;
  showFilters?: boolean;
  pageSize?: number;
}

interface FilterState {
  search: string;
  category: string;
  genre: string;
  year: string;
  quality: string;
  language: string;
  section: string;
  sortBy: string;
  sortOrder: string;
  page: number;
}

const CATEGORIES = [
  { value: "all", label: "جميع الفئات" },
  { value: "movie", label: "أفلام" },
  { value: "series", label: "مسلسلات" },
  { value: "show", label: "تلفزيون" },
  { value: "mix", label: "منوعات" },
];

const GENRES = [
  { value: "all", label: "جميع الأنواع" },
  { value: "action", label: "أكشن" },
  { value: "comedy", label: "كوميديا" },
  { value: "drama", label: "دراما" },
  { value: "horror", label: "رعب" },
  { value: "romance", label: "رومانسي" },
  { value: "thriller", label: "إثارة" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "rating", label: "التقييم" },
  { value: "popular", label: "الأكثر شعبية" },
  { value: "views", label: "المشاهدات" },
  { value: "title", label: "الاسم" },
];

export default function FilteredGrid({ 
  endpoint, 
  title, 
  initialFilters = {}, 
  showSearch = true, 
  showFilters = true,
  pageSize = 20 
}: FilteredGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    genre: "all",
    year: "all",
    quality: "all",
    language: "all",
    section: "all",
    sortBy: "newest",
    sortOrder: "desc",
    page: 1,
    ...initialFilters,
  });

  // Build query parameters
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all" && value !== "") {
      queryParams.set(key, value.toString());
    }
  });
  queryParams.set("limit", pageSize.toString());
  queryParams.set("offset", ((filters.page - 1) * pageSize).toString());

  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint, queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`${endpoint}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const movies: Movie[] = data?.movies || [];
  const totalCount = data?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1, // Reset to page 1 when other filters change
    }));
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      genre: "all",
      year: "all",
      quality: "all",
      language: "all",
      section: "all",
      sortBy: "newest",
      sortOrder: "desc",
      page: 1,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== "all") count++;
    if (filters.genre !== "all") count++;
    if (filters.year !== "all") count++;
    if (filters.quality !== "all") count++;
    if (filters.language !== "all") count++;
    if (filters.section !== "all") count++;
    return count;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">حدث خطأ في تحميل المحتوى</div>
        <Button onClick={() => window.location.reload()} variant="outline">
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || showSearch || showFilters) && (
        <div className="space-y-4">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}

          {/* Search Bar */}
          {showSearch && (
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ابحث عن الأفلام والمسلسلات..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedSearch(true)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                بحث متقدم
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </div>
          )}

          {/* Quick Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map(genre => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <Filter className="w-4 h-4 mr-1" />
                  مسح الفلاتر
                </Button>
              )}

              <div className="mr-auto flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          {isLoading ? (
            "جاري التحميل..."
          ) : (
            `عرض ${((filters.page - 1) * pageSize) + 1}-${Math.min(filters.page * pageSize, totalCount)} من ${totalCount} نتيجة`
          )}
        </div>
        {filters.search && (
          <div>
            نتائج البحث عن: <strong>"{filters.search}"</strong>
          </div>
        )}
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">لا توجد نتائج للبحث</div>
          {getActiveFiltersCount() > 0 && (
            <Button onClick={clearFilters} variant="outline">
              مسح الفلاتر وإعادة المحاولة
            </Button>
          )}
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : "space-y-4"
        }>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant={viewMode === "list" ? "horizontal" : "vertical"}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handleFilterChange("page", Math.max(1, filters.page - 1))}
                  className={filters.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handleFilterChange("page", pageNum)}
                      isActive={filters.page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handleFilterChange("page", Math.min(totalPages, filters.page + 1))}
                  className={filters.page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        initialFilters={filters}
      />
    </div>
  );
}