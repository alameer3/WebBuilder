import { useState, useEffect } from "react";
import { useNavigate } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Search, Filter, SlidersHorizontal } from "lucide-react";

interface SearchFilters {
  query: string;
  category: string;
  genre: string[];
  year: { min: number | null; max: number | null };
  rating: { min: number | null; max: number | null };
  quality: string[];
  language: string[];
  section: string;
  sortBy: string;
  sortOrder: string;
}

const CATEGORIES = [
  { value: "all", label: "جميع الفئات" },
  { value: "movie", label: "أفلام" },
  { value: "series", label: "مسلسلات" },
  { value: "show", label: "تلفزيون" },
  { value: "mix", label: "منوعات" },
];

const GENRES = [
  { value: "action", label: "أكشن", id: "18" },
  { value: "comedy", label: "كوميديا", id: "20" },
  { value: "drama", label: "دراما", id: "21" },
  { value: "horror", label: "رعب", id: "22" },
  { value: "sci-fi", label: "خيال علمي", id: "23" },
  { value: "romance", label: "رومانسي", id: "26" },
  { value: "thriller", label: "إثارة", id: "27" },
  { value: "animation", label: "كرتون", id: "33" },
  { value: "adventure", label: "مغامرات", id: "35" },
  { value: "crime", label: "جريمة", id: "43" },
  { value: "family", label: "عائلي", id: "71" },
  { value: "egyptian", label: "مصري", id: "72" },
];

const QUALITIES = [
  { value: "HD", label: "HD" },
  { value: "FHD", label: "Full HD" },
  { value: "4K", label: "4K" },
  { value: "CAM", label: "CAM" },
  { value: "TS", label: "TS" },
  { value: "WEB-DL", label: "WEB-DL" },
  { value: "BluRay", label: "BluRay" },
];

const LANGUAGES = [
  { value: "arabic", label: "عربي" },
  { value: "english", label: "إنجليزي" },
  { value: "hindi", label: "هندي" },
  { value: "turkish", label: "تركي" },
  { value: "korean", label: "كوري" },
  { value: "french", label: "فرنسي" },
  { value: "spanish", label: "إسباني" },
];

const SECTIONS = [
  { value: "all", label: "جميع الأقسام" },
  { value: "dubbed", label: "مدبلج", id: "29" },
  { value: "subtitled", label: "مترجم", id: "30" },
  { value: "arabic", label: "عربي", id: "31" },
  { value: "foreign", label: "أجنبي", id: "32" },
  { value: "gulf", label: "خليجي", id: "33" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "rating", label: "التقييم" },
  { value: "views", label: "المشاهدات" },
  { value: "title", label: "الاسم" },
  { value: "year", label: "السنة" },
];

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: Partial<SearchFilters>;
}

export default function AdvancedSearch({ isOpen, onClose, initialFilters }: AdvancedSearchProps) {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    genre: [],
    year: { min: null, max: null },
    rating: { min: null, max: null },
    quality: [],
    language: [],
    section: "all",
    sortBy: "newest",
    sortOrder: "desc",
    ...initialFilters,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    // Count active filters
    let count = 0;
    if (filters.query.trim()) count++;
    if (filters.category !== "all") count++;
    if (filters.genre.length > 0) count++;
    if (filters.year.min || filters.year.max) count++;
    if (filters.rating.min || filters.rating.max) count++;
    if (filters.quality.length > 0) count++;
    if (filters.language.length > 0) count++;
    if (filters.section !== "all") count++;
    
    setActiveFiltersCount(count);
  }, [filters]);

  const handleSearch = () => {
    // Build search URL with filters
    const searchParams = new URLSearchParams();
    
    if (filters.query.trim()) searchParams.set("q", filters.query.trim());
    if (filters.category !== "all") searchParams.set("category", filters.category);
    if (filters.genre.length > 0) searchParams.set("genre", filters.genre.join(","));
    if (filters.year.min) searchParams.set("year_min", filters.year.min.toString());
    if (filters.year.max) searchParams.set("year_max", filters.year.max.toString());
    if (filters.rating.min) searchParams.set("rating_min", filters.rating.min.toString());
    if (filters.rating.max) searchParams.set("rating_max", filters.rating.max.toString());
    if (filters.quality.length > 0) searchParams.set("quality", filters.quality.join(","));
    if (filters.language.length > 0) searchParams.set("language", filters.language.join(","));
    if (filters.section !== "all") searchParams.set("section", filters.section);
    searchParams.set("sort", filters.sortBy);
    searchParams.set("order", filters.sortOrder);

    navigate(`/search?${searchParams.toString()}`);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      genre: [],
      year: { min: null, max: null },
      rating: { min: null, max: null },
      quality: [],
      language: [],
      section: "all",
      sortBy: "newest",
      sortOrder: "desc",
    });
  };

  const handleGenreToggle = (genreValue: string) => {
    setFilters(prev => ({
      ...prev,
      genre: prev.genre.includes(genreValue)
        ? prev.genre.filter(g => g !== genreValue)
        : [...prev.genre, genreValue]
    }));
  };

  const handleQualityToggle = (qualityValue: string) => {
    setFilters(prev => ({
      ...prev,
      quality: prev.quality.includes(qualityValue)
        ? prev.quality.filter(q => q !== qualityValue)
        : [...prev.quality, qualityValue]
    }));
  };

  const handleLanguageToggle = (languageValue: string) => {
    setFilters(prev => ({
      ...prev,
      language: prev.language.includes(languageValue)
        ? prev.language.filter(l => l !== languageValue)
        : [...prev.language, languageValue]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            البحث المتقدم
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} فلتر نشط
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="search-query">البحث</Label>
            <Input
              id="search-query"
              placeholder="ابحث عن الأفلام والمسلسلات..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="text-right"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <Label>الفئة</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
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
            </div>

            {/* Section */}
            <div className="space-y-2">
              <Label>القسم</Label>
              <Select value={filters.section} onValueChange={(value) => setFilters(prev => ({ ...prev, section: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map(section => (
                    <SelectItem key={section.value} value={section.value}>
                      {section.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <Label>النوع</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {GENRES.map(genre => (
                <label key={genre.value} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.genre.includes(genre.value)}
                    onCheckedChange={() => handleGenreToggle(genre.value)}
                  />
                  <span className="text-sm mr-2">{genre.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Year Range */}
          <div className="space-y-3">
            <Label>السنة</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year-min" className="text-xs text-gray-500">من</Label>
                <Input
                  id="year-min"
                  type="number"
                  placeholder="1990"
                  min="1900"
                  max="2030"
                  value={filters.year.min || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    year: { ...prev.year, min: e.target.value ? parseInt(e.target.value) : null }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="year-max" className="text-xs text-gray-500">إلى</Label>
                <Input
                  id="year-max"
                  type="number"
                  placeholder="2025"
                  min="1900"
                  max="2030"
                  value={filters.year.max || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    year: { ...prev.year, max: e.target.value ? parseInt(e.target.value) : null }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Rating Range */}
          <div className="space-y-3">
            <Label>التقييم</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating-min" className="text-xs text-gray-500">من</Label>
                <Input
                  id="rating-min"
                  type="number"
                  placeholder="1"
                  min="1"
                  max="10"
                  step="0.1"
                  value={filters.rating.min || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    rating: { ...prev.rating, min: e.target.value ? parseFloat(e.target.value) : null }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="rating-max" className="text-xs text-gray-500">إلى</Label>
                <Input
                  id="rating-max"
                  type="number"
                  placeholder="10"
                  min="1"
                  max="10"
                  step="0.1"
                  value={filters.rating.max || ""}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    rating: { ...prev.rating, max: e.target.value ? parseFloat(e.target.value) : null }
                  }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Quality */}
          <div className="space-y-3">
            <Label>الجودة</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {QUALITIES.map(quality => (
                <label key={quality.value} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.quality.includes(quality.value)}
                    onCheckedChange={() => handleQualityToggle(quality.value)}
                  />
                  <span className="text-sm mr-2">{quality.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <Label>اللغة</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {LANGUAGES.map(language => (
                <label key={language.value} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.language.includes(language.value)}
                    onCheckedChange={() => handleLanguageToggle(language.value)}
                  />
                  <span className="text-sm mr-2">{language.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sort Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ترتيب حسب</Label>
              <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label>ترتيب</Label>
              <Select value={filters.sortOrder} onValueChange={(value) => setFilters(prev => ({ ...prev, sortOrder: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">تنازلي</SelectItem>
                  <SelectItem value="asc">تصاعدي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              البحث
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              مسح الفلاتر
            </Button>
            <Button variant="ghost" onClick={onClose}>
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}