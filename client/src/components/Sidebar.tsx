import { Link, useLocation } from "wouter";
import { 
  Home, 
  Film, 
  Tv, 
  Clock, 
  PlayCircle, 
  Shuffle, 
  User, 
  Heart, 
  Bell, 
  MessageCircle, 
  LogOut,
  LogIn
} from "lucide-react";

const menuItems = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/movies", label: "أفلام", icon: Film },
  { href: "/series", label: "مسلسلات", icon: Tv },
  { href: "/shows", label: "تلفزيون", icon: PlayCircle },
  { href: "/mix", label: "منوعات", icon: Shuffle },
  { href: "/recent", label: "الأحدث", icon: Clock },
];

const userItems = [
  { href: "/profile", label: "الملف الشخصي", icon: User },
  { href: "/favorites", label: "المفضلة", icon: Heart },
  { href: "/notifications", label: "الإشعارات", icon: Bell },
  { href: "/contactus", label: "اتصل بنا", icon: MessageCircle },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900/95 backdrop-blur-sm border-l border-gray-800 hidden lg:block overflow-y-auto">
      <div className="p-4">
        
        {/* Main Navigation */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">التصفح</h3>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">المستخدم</h3>
          <nav className="space-y-2">
            {userItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.href === "/notifications" && (
                    <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-auto rtl:ml-auto rtl:mr-0">
                      3
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Authentication */}
        <div className="border-t border-gray-800 pt-4">
          <Link
            href="/login"
            className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
          >
            <LogIn className="h-5 w-5" />
            <span className="font-medium">تسجيل الدخول</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="text-center">
            <div className="text-lg font-bold mb-1">
              <span className="text-white">يمن</span>
              <span className="text-orange-500">فليكس</span>
            </div>
            <div className="text-xs text-gray-500">YEMEN FLIX</div>
            <div className="text-xs text-gray-500 mt-2">
              الموقع اليمني الأول<br />
              للأفلام والمسلسلات
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}