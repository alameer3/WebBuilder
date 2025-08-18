import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

// Layout components
import AkwamHeader from "@/components/AkwamHeader";
import MainMenu from "@/components/MainMenu";
import SearchBox from "@/components/SearchBox";
import Footer from "@/components/Footer";
import PaceLoader from "@/components/PaceLoader";

// Import CSS files
import "@/assets/css/plugins.css";
import "@/assets/css/style.css"; 
import "@/assets/css/akwam-original.css";
import "@/assets/css/yemen-flix.css";

// Pages  
import Home from "@/pages/home";
import Search from "@/pages/search";
import Movies from "@/pages/movies";
import Series from "@/pages/series";
import Recent from "@/pages/recent";
import Shows from "@/pages/shows";
import Mix from "@/pages/mix";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import Contact from "@/pages/contact";
import MovieDetail from "@/pages/movie-detail";
import SeriesDetail from "@/pages/series-detail";
import WatchPage from "@/pages/watch";
import Favorites from "@/pages/favorites";
import Notifications from "@/pages/notifications";
import NotFound from "@/pages/not-found";
import PersonDetail from "@/pages/person-detail";
import EpisodeDetail from "@/pages/episode-detail";
import DMCA from "@/pages/dmca";
import AdPolicy from "@/pages/ad-policy";
import AdminRouter from "@/admin/index";
import Ones from "@/pages/ones";
import FavoriteMovies from "@/pages/favorite-movies";

function Router() {
  const [location] = useLocation();
  const isHomePage = location === "/" || location === "/home" || location === "/main";
  
  useEffect(() => {
    // Add Arabic font and RTL support
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.className = 'header-fixed';
    
    // Handle keyboard events for ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('search-active', 'main-menu-active');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Site overlay */}
      <span 
        className="site-overlay" 
        onClick={() => document.body.classList.remove('main-menu-active', 'search-active')}
      ></span>

      {/* Main Menu */}
      <MainMenu />

      {/* Search Box */}
      <SearchBox />

      {/* Site Container - مطابق للهيكل الأصلي */}
      <div className="site-container">
        {/* Header - only show on non-home pages with proper structure */}
        {!isHomePage && (
          <>
            <div className="main-header-top"></div>
            <AkwamHeader />
            <PaceLoader />
            <div className="main-header-height"></div>
          </>
        )}

        {/* Admin routes - separate layout */}
        {location.startsWith('/admin') && !isHomePage ? (
          <AdminRouter />
        ) : (
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/main" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/recent" component={Recent} />
              <Route path="/shows" component={Shows} />
              <Route path="/mix" component={Mix} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Login} />
              <Route path="/contactus" component={Contact} />
              <Route path="/movie/:id" component={MovieDetail} />
              <Route path="/watch/:id" component={WatchPage} />
              <Route path="/series/:id" component={SeriesDetail} />
              <Route path="/person/:id" component={PersonDetail} />
              <Route path="/series/:seriesId/episode/:episodeId" component={EpisodeDetail} />
              <Route path="/dmca" component={DMCA} />
              <Route path="/ad-policy" component={AdPolicy} />
              <Route path="/ones" component={Ones} />
              <Route path="/favorite-movies" component={FavoriteMovies} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/notifications" component={Notifications} />
              <Route component={NotFound} />
            </Switch>
          </main>
        )}
        
        {/* Footer - only show on non-home pages and non-admin pages */}
        {!isHomePage && !location.startsWith('/admin') && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
