import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="text-2xl font-bold">
              <span className="text-white">يمن</span>
              <span className="text-orange-500">فليكس</span>
            </div>
            <div className="text-sm text-gray-400 hidden sm:block">YEMEN FLIX</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className={`hover:text-orange-500 transition-colors ${location === "/" ? "text-orange-500" : "text-gray-300"}`}>
              الرئيسية
            </Link>
            <Link href="/movies" className={`hover:text-orange-500 transition-colors ${location === "/movies" ? "text-orange-500" : "text-gray-300"}`}>
              أفلام
            </Link>
            <Link href="/series" className={`hover:text-orange-500 transition-colors ${location === "/series" ? "text-orange-500" : "text-gray-300"}`}>
              مسلسلات
            </Link>
            <Link href="/recent" className={`hover:text-orange-500 transition-colors ${location === "/recent" ? "text-orange-500" : "text-gray-300"}`}>
              الأحدث
            </Link>
            <Link href="/shows" className={`hover:text-orange-500 transition-colors ${location === "/shows" ? "text-orange-500" : "text-gray-300"}`}>
              برامج
            </Link>
            <Link href="/mix" className={`hover:text-orange-500 transition-colors ${location === "/mix" ? "text-orange-500" : "text-gray-300"}`}>
              متنوع
            </Link>
          </div>

          {/* Search & User Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="البحث عن أفلام ومسلسلات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="mr-2 rtl:ml-2 rtl:mr-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-300 hover:text-white"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
            </Link>

            {/* User Profile */}
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                href="/movies" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/movies" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                أفلام
              </Link>
              <Link 
                href="/series" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/series" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                مسلسلات
              </Link>
              <Link 
                href="/recent" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/recent" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الأحدث
              </Link>
              <Link 
                href="/shows" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/shows" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                برامج
              </Link>
              <Link 
                href="/mix" 
                className={`px-4 py-2 rounded hover:bg-gray-800 transition-colors ${location === "/mix" ? "text-orange-500 bg-gray-800" : "text-gray-300"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                متنوع
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}