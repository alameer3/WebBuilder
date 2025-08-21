import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Tag, Film, Tv, Monitor } from 'lucide-react';

export default function Categories() {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState('movie');

  // Mock categories data - in real app this would come from API
  const categoriesData = [
    { id: '1', name: 'أكشن', type: 'movie', color: '#ef4444', itemCount: 45 },
    { id: '2', name: 'دراما', type: 'movie', color: '#3b82f6', itemCount: 32 },
    { id: '3', name: 'كوميديا', type: 'movie', color: '#10b981', itemCount: 28 },
    { id: '4', name: 'رعب', type: 'movie', color: '#8b5cf6', itemCount: 15 },
    { id: '5', name: 'رومانسي', type: 'movie', color: '#ec4899', itemCount: 22 },
    { id: '6', name: 'خيال علمي', type: 'movie', color: '#06b6d4', itemCount: 18 },
    { id: '7', name: 'مسلسلات درامية', type: 'series', color: '#f59e0b', itemCount: 12 },
    { id: '8', name: 'مسلسلات كوميدية', type: 'series', color: '#84cc16', itemCount: 8 },
    { id: '9', name: 'برامج توك شو', type: 'show', color: '#f97316', itemCount: 5 },
    { id: '10', name: 'برامج طبخ', type: 'show', color: '#14b8a6', itemCount: 3 },
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      console.log('Adding category:', { name: newCategoryName, type: newCategoryType });
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film size={16} />;
      case 'series': return <Tv size={16} />;
      case 'show': return <Monitor size={16} />;
      default: return <Tag size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'movie': return 'أفلام';
      case 'series': return 'مسلسلات';
      case 'show': return 'برامج';
      default: return 'عام';
    }
  };

  const getTypeCounts = () => {
    return {
      movie: categoriesData.filter(c => c.type === 'movie').length,
      series: categoriesData.filter(c => c.type === 'series').length,
      show: categoriesData.filter(c => c.type === 'show').length,
    };
  };

  const typeCounts = getTypeCounts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة الفئات</h1>
          <p className="text-gray-400 mt-1">تنظيم وإدارة فئات المحتوى</p>
        </div>
        <button 
          onClick={() => setIsAddingCategory(true)}
          className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          إضافة فئة جديدة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Tag className="text-[#f3951e]" size={24} />
            <div>
              <h3 className="text-white font-bold">إجمالي الفئات</h3>
              <p className="text-2xl font-bold text-[#f3951e]">{categoriesData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Film className="text-blue-400" size={24} />
            <div>
              <h3 className="text-white font-bold">فئات الأفلام</h3>
              <p className="text-2xl font-bold text-blue-400">{typeCounts.movie}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Tv className="text-green-400" size={24} />
            <div>
              <h3 className="text-white font-bold">فئات المسلسلات</h3>
              <p className="text-2xl font-bold text-green-400">{typeCounts.series}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Monitor className="text-purple-400" size={24} />
            <div>
              <h3 className="text-white font-bold">فئات البرامج</h3>
              <p className="text-2xl font-bold text-purple-400">{typeCounts.show}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Form */}
      {isAddingCategory && (
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4">إضافة فئة جديدة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="اسم الفئة"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
            />
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
              className="bg-[#161619] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
            >
              <option value="movie">أفلام</option>
              <option value="series">مسلسلات</option>
              <option value="show">برامج</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg transition-colors"
              >
                إضافة
              </button>
              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <div key={category.id} className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="text-white font-bold">{category.name}</h3>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-400/10 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-400/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                {getTypeIcon(category.type)}
                <span>{getTypeLabel(category.type)}</span>
              </div>
              <span className="text-gray-400">
                {category.itemCount} عنصر
              </span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-[#161619] rounded-full h-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: category.color,
                    width: `${Math.min((category.itemCount / 50) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {((category.itemCount / 50) * 100).toFixed(0)}% من الحد الأقصى
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Distribution Chart */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-bold text-white mb-6">توزيع الفئات حسب النوع</h3>
        <div className="space-y-4">
          {['movie', 'series', 'show'].map((type) => {
            const typeCategories = categoriesData.filter(c => c.type === type);
            const totalItems = typeCategories.reduce((sum, cat) => sum + cat.itemCount, 0);
            
            return (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type)}
                    <span className="text-white font-medium">{getTypeLabel(type)}</span>
                  </div>
                  <span className="text-gray-400">{totalItems} عنصر</span>
                </div>
                <div className="w-full bg-[#161619] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      type === 'movie' ? 'bg-blue-400' :
                      type === 'series' ? 'bg-green-400' : 'bg-purple-400'
                    }`}
                    style={{ width: `${(totalItems / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}