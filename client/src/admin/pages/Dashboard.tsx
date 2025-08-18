import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Film, Tv, Users, Eye, TrendingUp, Clock, Star, Download } from 'lucide-react';

export default function Dashboard() {
  const { data: moviesData } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  const { data: contactsData } = useQuery({
    queryKey: ['/api/contacts'],
    select: (data: any) => data?.contacts || []
  });

  const stats = [
    {
      title: 'إجمالي الأفلام',
      value: moviesData?.filter((m: any) => m.category === 'movie').length || 0,
      icon: Film,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      title: 'إجمالي المسلسلات',
      value: moviesData?.filter((m: any) => m.category === 'series').length || 0,
      icon: Tv,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      title: 'إجمالي المشاهدات',
      value: moviesData?.reduce((sum: number, m: any) => sum + (m.viewCount || 0), 0) || 0,
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      title: 'الرسائل الجديدة',
      value: contactsData?.length || 0,
      icon: Users,
      color: 'text-[#f3951e]',
      bgColor: 'bg-[#f3951e]/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-gray-400 mt-1">نظرة عامة على YEMEN_FLIX</p>
        </div>
        <div className="text-sm text-gray-400">
          آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#27272c] rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value.toLocaleString('ar-SA')}
                  </p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Clock className="ml-2" size={20} />
              النشاطات الحديثة
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {moviesData?.slice(0, 5).map((movie: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#f3951e] rounded-full"></div>
                  <img 
                    src={movie.poster || '/api/placeholder/40/60'} 
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{movie.title}</p>
                    <p className="text-gray-400 text-xs">تمت الإضافة حديثاً</p>
                  </div>
                  <span className="text-xs text-gray-400">الآن</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Rated Content */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Star className="ml-2" size={20} />
              المحتوى الأعلى تقييماً
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {moviesData?.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)).slice(0, 5).map((movie: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#f3951e] rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <img 
                    src={movie.poster || '/api/placeholder/40/60'} 
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{movie.title}</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#f3951e] fill-current" />
                      <span className="text-[#f3951e] text-xs">{movie.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{movie.viewCount || 0} مشاهدة</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">إجراءات سريعة</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Film size={20} />
              إضافة فيلم جديد
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Tv size={20} />
              إضافة مسلسل جديد
            </button>
            <button className="bg-[#f3951e] hover:bg-[#e8891a] text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              تحديث البيانات
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <h4 className="text-white font-bold mb-4">حالة الخادم</h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">متصل</span>
          </div>
        </div>
        
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <h4 className="text-white font-bold mb-4">قاعدة البيانات</h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">تعمل بشكل جيد</span>
          </div>
        </div>
        
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <h4 className="text-white font-bold mb-4">TMDB API</h4>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm">متاح</span>
          </div>
        </div>
      </div>
    </div>
  );
}