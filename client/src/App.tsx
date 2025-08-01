import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout components
import Sidebar from "@/components/Sidebar";

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
import Favorites from "@/pages/favorites";
import Notifications from "@/pages/notifications";
import NotFound from "@/pages/not-found";
import PersonDetail from "@/pages/person-detail";
import EpisodeDetail from "@/pages/episode-detail";
import DMCA from "@/pages/dmca";
import AdPolicy from "@/pages/ad-policy";
import Ones from "@/pages/ones";
import FavoriteMovies from "@/pages/favorite-movies";

function Router() {
  const [location] = useLocation();
  const isHomePage = location === "/" || location === "/home" || location === "/main";
  const isFullLayoutPage = isHomePage || location === "/movies" || location === "/series" || location === "/shows" || location === "/mix" || location === "/recent" || location === "/search" || location === "/login" || location === "/profile" || location === "/contactus" || location === "/dmca" || location === "/ad-policy" || location === "/ones" || location === "/favorite-movies" || location.startsWith("/movie/") || location.startsWith("/series/") || location.startsWith("/person/") || location.includes("/episode/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className={isFullLayoutPage ? "" : "flex"}>
        {!isFullLayoutPage && <Sidebar />}
        <main className={isFullLayoutPage ? "" : "flex-1 lg:mr-64 px-4 py-6"}>
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
      </div>
    </div>
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
