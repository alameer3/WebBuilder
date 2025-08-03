import { useState } from 'react';

interface FilterOptions {
  genres: string[];
  years: number[];
  countries: string[];
  quality: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface FilterPanelProps {
  options: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  className?: string;
}

export default function FilterPanel({ options, onFilterChange, className = "" }: FilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<Partial<FilterOptions>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const availableGenres = [
    'أكشن', 'دراما', 'كوميديا', 'رومانسي', 'مغامرات', 'خيال علمي',
    'رعب', 'إثارة', 'جريمة', 'حرب', 'تاريخي', 'وثائقي', 'عائلي', 'مسيقي'
  ];

  const availableYears = Array.from({ length: 30 }, (_, i) => 2025 - i);

  const availableCountries = [
    'مصر', 'السعودية', 'الإمارات', 'الأردن', 'لبنان', 'سوريا', 'العراق',
    'المغرب', 'الجزائر', 'تونس', 'الكويت', 'قطر', 'البحرين', 'عمان', 'اليمن',
    'أمريكا', 'بريطانيا', 'فرنسا', 'ألمانيا', 'إيطاليا', 'إسبانيا',
    'تركيا', 'الهند', 'كوريا الجنوبية', 'اليابان', 'الصين'
  ];

  const availableQualities = ['720p', '1080p', '4K', 'HD', 'CAM', 'WEB-DL', 'BluRay'];

  const sortOptions = [
    { value: 'title', label: 'الاسم' },
    { value: 'year', label: 'السنة' },
    { value: 'rating', label: 'التقييم' },
    { value: 'date_added', label: 'تاريخ الإضافة' },
    { value: 'views', label: 'المشاهدات' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  return (
    <div className={`filter-panel ${className}`}>
      <div className="filter-header d-flex align-items-center justify-content-between">
        <h3 className="filter-title">تصفية النتائج</h3>
        <button 
          className="btn btn-link toggle-filters"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className={`icon-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      </div>

      <div className={`filter-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="row">
          {/* الأنواع */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">النوع</label>
              <select 
                className="form-control"
                value={selectedFilters.genres?.[0] || ''}
                onChange={(e) => handleFilterChange('genres', e.target.value ? [e.target.value] : [])}
              >
                <option value="">جميع الأنواع</option>
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* السنة */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">السنة</label>
              <select 
                className="form-control"
                value={selectedFilters.years?.[0] || ''}
                onChange={(e) => handleFilterChange('years', e.target.value ? [parseInt(e.target.value)] : [])}
              >
                <option value="">جميع السنوات</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* البلد */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">البلد</label>
              <select 
                className="form-control"
                value={selectedFilters.countries?.[0] || ''}
                onChange={(e) => handleFilterChange('countries', e.target.value ? [e.target.value] : [])}
              >
                <option value="">جميع البلدان</option>
                {availableCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* الجودة */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">الجودة</label>
              <select 
                className="form-control"
                value={selectedFilters.quality?.[0] || ''}
                onChange={(e) => handleFilterChange('quality', e.target.value ? [e.target.value] : [])}
              >
                <option value="">جميع الجودات</option>
                {availableQualities.map(quality => (
                  <option key={quality} value={quality}>{quality}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {/* ترتيب حسب */}
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">ترتيب حسب</label>
              <select 
                className="form-control"
                value={selectedFilters.sortBy || 'date_added'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* اتجاه الترتيب */}
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="filter-group">
              <label className="filter-label">الترتيب</label>
              <select 
                className="form-control"
                value={selectedFilters.sortOrder || 'desc'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">تنازلي</option>
                <option value="asc">تصاعدي</option>
              </select>
            </div>
          </div>

          {/* مسح الفلاتر */}
          <div className="col-lg-4 col-md-12 mb-3">
            <div className="filter-group">
              <label className="filter-label">&nbsp;</label>
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                مسح الفلاتر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}