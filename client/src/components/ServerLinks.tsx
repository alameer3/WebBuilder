import React, { useState } from 'react';
import { Play, Download, Eye, Star, Clock, Wifi, WifiOff } from 'lucide-react';

interface Server {
  id: string;
  name: string;
  quality: string;
  size?: string;
  speed: 'fast' | 'medium' | 'slow';
  status: 'online' | 'offline' | 'maintenance';
  watchUrl?: string;
  downloadUrl?: string;
  type: 'watch' | 'download';
}

interface ServerLinksProps {
  movieId: string;
  title: string;
}

export default function ServerLinks({ movieId, title }: ServerLinksProps) {
  const [activeTab, setActiveTab] = useState<'watch' | 'download'>('watch');

  // خوادم المشاهدة (محاكاة)
  const watchServers: Server[] = [
    {
      id: '1',
      name: 'يمن فليكس',
      quality: '1080p',
      speed: 'fast',
      status: 'online',
      type: 'watch',
      watchUrl: `/watch/${movieId}?server=yemenflix&quality=1080p`
    },
    {
      id: '2', 
      name: 'سيرفر العرب',
      quality: '720p',
      speed: 'fast',
      status: 'online',
      type: 'watch',
      watchUrl: `/watch/${movieId}?server=arab&quality=720p`
    },
    {
      id: '3',
      name: 'MyCima',
      quality: '480p',
      speed: 'medium',
      status: 'online',
      type: 'watch',
      watchUrl: `/watch/${movieId}?server=mycima&quality=480p`
    },
    {
      id: '4',
      name: 'FaselHD',
      quality: '1080p',
      speed: 'medium',
      status: 'maintenance',
      type: 'watch',
      watchUrl: `/watch/${movieId}?server=faselhd&quality=1080p`
    }
  ];

  // خوادم التحميل (محاكاة)
  const downloadServers: Server[] = [
    {
      id: '5',
      name: 'تحميل مباشر',
      quality: '4K',
      size: '8.5 GB',
      speed: 'fast',
      status: 'online',
      type: 'download',
      downloadUrl: `/download/${movieId}?quality=4k`
    },
    {
      id: '6',
      name: 'تحميل سريع',
      quality: '1080p',
      size: '2.1 GB', 
      speed: 'fast',
      status: 'online',
      type: 'download',
      downloadUrl: `/download/${movieId}?quality=1080p`
    },
    {
      id: '7',
      name: 'تحميل عادي',
      quality: '720p',
      size: '1.2 GB',
      speed: 'medium',
      status: 'online',
      type: 'download',
      downloadUrl: `/download/${movieId}?quality=720p`
    },
    {
      id: '8',
      name: 'تحميل مضغوط',
      quality: '480p',
      size: '650 MB',
      speed: 'medium',
      status: 'online',
      type: 'download',
      downloadUrl: `/download/${movieId}?quality=480p`
    }
  ];

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Star className="w-4 h-4 text-green-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'slow': return <Clock className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'maintenance': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'متصل';
      case 'offline': return 'غير متصل';
      case 'maintenance': return 'صيانة';
      default: return status;
    }
  };

  const activeServers = activeTab === 'watch' ? watchServers : downloadServers;

  return (
    <div className="bg-[#27272c] rounded-lg border border-gray-700">
      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('watch')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'watch'
                ? 'bg-[#f3951e] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#161619]'
            }`}
          >
            <Play className="w-5 h-5 inline-block mr-2" />
            مشاهدة مباشرة
          </button>
          <button
            onClick={() => setActiveTab('download')}
            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
              activeTab === 'download'
                ? 'bg-[#f3951e] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#161619]'
            }`}
          >
            <Download className="w-5 h-5 inline-block mr-2" />
            تحميل مباشر
          </button>
        </nav>
      </div>

      {/* Servers List */}
      <div className="p-6">
        <div className="space-y-3">
          {activeServers.map((server) => (
            <div
              key={server.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                server.status === 'online'
                  ? 'border-gray-600 hover:border-[#f3951e] bg-[#161619]'
                  : 'border-gray-700 bg-gray-800 opacity-75'
              }`}
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getStatusIcon(server.status)}
                  <span className={`font-medium ${
                    server.status === 'online' ? 'text-white' : 'text-gray-400'
                  }`}>
                    {server.name}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                  <span className="bg-[#f3951e] text-white px-2 py-1 rounded text-xs">
                    {server.quality}
                  </span>
                  {server.size && (
                    <span className="text-gray-400">{server.size}</span>
                  )}
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {getSpeedIcon(server.speed)}
                    <span className="text-gray-400">{getStatusText(server.status)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {server.status === 'online' && (
                  <>
                    {activeTab === 'watch' && server.watchUrl && (
                      <a
                        href={server.watchUrl}
                        className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Play className="w-4 h-4" />
                        <span>مشاهدة</span>
                      </a>
                    )}
                    {activeTab === 'download' && server.downloadUrl && (
                      <a
                        href={server.downloadUrl}
                        className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 rtl:space-x-reverse"
                        download
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل</span>
                      </a>
                    )}
                  </>
                )}
                {server.status !== 'online' && (
                  <span className="text-gray-500 text-sm">
                    {server.status === 'maintenance' ? 'قيد الصيانة' : 'غير متاح'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-4 bg-[#161619] rounded-lg border border-gray-700">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Eye className="w-5 h-5 text-[#f3951e] mt-0.5" />
            <div className="text-sm">
              <p className="text-white font-medium mb-1">نصائح للمشاهدة المثلى:</p>
              <ul className="text-gray-400 space-y-1">
                <li>• اختر الجودة المناسبة لسرعة الإنترنت لديك</li>
                <li>• في حالة انقطاع الاتصال، جرب سيرفر آخر</li>
                <li>• التحميل أفضل للمشاهدة بدون انترنت</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}