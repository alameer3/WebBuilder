import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    Typed: any;
    $: any;
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const typedElementRef = useRef<HTMLSpanElement>(null);
  const searchTypedRef = useRef<HTMLSpanElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    let typedInstance: any = null;
    let searchTypedInstance: any = null;

    // Initialize typing animations after the scripts are loaded
    const initTypedAnimations = () => {
      if (typeof window.Typed !== 'undefined') {
        // Typing animation for the main logo
        if (typedElementRef.current && !typedInstance) {
          typedInstance = new window.Typed(typedElementRef.current, {
            strings: [
              "𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗",
              "يمن فليكس",
              "موقع الأفلام العربي",
              "أفلام ومسلسلات عربية",
              "مشاهدة مجانية"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 2000,
            startDelay: 500,
            showCursor: true,
            cursorChar: '|'
          });
        }

        // Typing animation for search placeholder  
        if (searchTypedRef.current && !searchTypedInstance) {
          searchTypedInstance = new window.Typed(searchTypedRef.current, {
            strings: [
              "ابحث عن أفلامك المفضلة...",
              "مسلسلات عربية وأجنبية...", 
              "أحدث الأفلام 2025...",
              "أفلام أكشن ودراما...",
              "كوميديا ورعب..."
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 1500,
            startDelay: 1000,
            showCursor: false
          });
        }
      }
    };

    // Check if scripts are loaded with retries
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max wait time
    
    const checkScripts = () => {
      if (typeof window.Typed !== 'undefined') {
        initTypedAnimations();
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(checkScripts, 100);
      } else {
        console.warn('Typed.js not loaded after 5 seconds, using fallback');
        // Fallback: show static text
        if (typedElementRef.current) {
          typedElementRef.current.textContent = '𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗';
        }
        if (searchTypedRef.current) {
          searchTypedRef.current.textContent = 'ابحث هنا عن فيلم أو مسلسل...';
        }
      }
    };

    // Start checking after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkScripts, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (typedInstance) {
        typedInstance.destroy();
      }
      if (searchTypedInstance) {
        searchTypedInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden page-home yemen-flix-home">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center">
          {/* User Panel */}
          <div className="flex items-center text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ml-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <span className="text-sm">أضيف حديثاً</span>
          </div>
          
          {/* Logo */}
          <div className="text-white text-xl font-bold tracking-wider min-h-[2rem]">
            <span ref={typedElementRef} className="yemen-flix-typed"></span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Central Logo Circle with YEMEN_FLIX Style */}
        <div className="mb-12 yemen-flix-fade-in">
          <div className="home-site-btn-container">
            <div className="home-site-btn">
              <div className="logo text-center text-white">
                <div className="text-5xl text-white font-bold mb-2" style={{ fontFamily: 'yemen-flix, Noto Sans Arabic' }}>
                  Y
                </div>
              </div>
              <div className="text text-center text-white">
                <div className="text-sm font-semibold">الصفحة الرئيسية</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-12 w-full max-w-2xl yemen-flix-slide-up">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=""
                className="w-full h-16 text-white text-lg px-6 pl-24 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 yemen-flix-search-box"
                style={{ borderRadius: '0' }}
              />
              <div className="absolute top-0 left-6 right-24 h-16 flex items-center pointer-events-none text-white/60 text-lg">
                <span ref={searchTypedRef} className="search-typed-placeholder"></span>
              </div>
            </div>
            <button
              type="submit"
              className="absolute left-2 top-2 bottom-2 px-6 text-white font-semibold yemen-flix-search-btn"
              style={{ borderRadius: '0' }}
            >
              بحث
            </button>
          </form>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 yemen-flix-slide-up">
          {/* Movies */}
          <a href="/movies" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 yemen-flix-category-icon flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎬</div>
                  <div className="text-xs">MOVIE</div>
                </div>
              </div>
              <span className="text-lg font-semibold">أفلام</span>
            </div>
          </a>

          {/* TV Shows */}
          <a href="/shows" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 yemen-flix-category-icon flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">📺</div>
                  <div className="text-xs">TV</div>
                </div>
              </div>
              <span className="text-lg font-semibold">تلفزيون</span>
            </div>
          </a>

          {/* Series */}
          <a href="/series" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 yemen-flix-category-icon flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs">SERIES</div>
                </div>
              </div>
              <span className="text-lg font-semibold">مسلسلات</span>
            </div>
          </a>

          {/* Mix */}
          <a href="/mix" className="no-underline">
            <div className="flex flex-col items-center text-white hover:text-orange-500 transition-all duration-300 cursor-pointer group">
              <div className="w-20 h-20 yemen-flix-category-icon flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎭</div>
                  <div className="text-xs">MIX</div>
                </div>
              </div>
              <span className="text-lg font-semibold">منوعات</span>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-center space-x-6 space-x-reverse text-white/60 mb-4">
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📧</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📺</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">🌐</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">📧</span>
            </div>
          </a>
        </div>
        
        <div className="text-center text-white/60 text-sm">
          <p>جميع الحقوق محفوظة لـ شبكة 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗 © 2025</p>
        </div>
      </footer>
    </div>
  );
}