import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Film, 
  Tv, 
  Users, 
  Tags, 
  BarChart3, 
  Database, 
  Mail, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'لوحة التحكم', icon: Home },
    { path: '/admin/movies', label: 'إدارة الأفلام', icon: Film },
    { path: '/admin/series', label: 'إدارة المسلسلات', icon: Tv },
    { path: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
    { path: '/admin/categories', label: 'إدارة الفئات', icon: Tags },
    { path: '/admin/analytics', label: 'التحليلات', icon: BarChart3 },
    { path: '/admin/data-manager', label: 'إدارة البيانات', icon: Database },
    { path: '/admin/messages', label: 'الرسائل', icon: Mail },
    { path: '/admin/settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#161619] text-white" dir="rtl">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-y-0 right-0 z-50 w-64 bg-[#27272c] border-l border-[#f3951e] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#f3951e]">
          <h1 className="text-xl font-bold text-[#f3951e]">YEMEN_FLIX Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (item.path === '/admin/dashboard' && location === '/admin');
            
            return (
              <Link key={item.path} href={item.path}>
                <div className={`flex items-center px-4 py-3 text-sm hover:bg-[#161619] transition-colors ${
                  isActive ? 'bg-[#161619] border-l-4 border-[#f3951e] text-[#f3951e]' : 'text-gray-300'
                }`}>
                  <Icon size={20} className="ml-3" />
                  {item.label}
                </div>
              </Link>
            );
          })}
          
          <div className="mt-8 border-t border-gray-600 pt-4">
            <Link href="/">
              <div className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-[#161619] transition-colors">
                <Home size={20} className="ml-3" />
                العودة للموقع
              </div>
            </Link>
            <button className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#161619] transition-colors">
              <LogOut size={20} className="ml-3" />
              تسجيل الخروج
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-[#27272c] border-b border-[#f3951e] px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">مرحباً، المدير</span>
              <div className="w-8 h-8 bg-[#f3951e] rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">أ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#161619] p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}