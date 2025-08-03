import { useState } from 'react';
import { useLocation } from 'wouter';

export default function SearchBox() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      document.body.classList.remove('search-active');
    }
  };

  const closeSearch = () => {
    document.body.classList.remove('search-active');
  };

  return (
    <div className="search-box px-xl-5">
      <div className="container search-container">
        <form onSubmit={handleSearch} className="search-form" method="get">
          <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
            <button type="submit" className="px-3 ml-2 font-size-30 bg-transparent border-0">
              <i className="icon-search"></i>
            </button>
            <input 
              type="search" 
              name="q" 
              id="searchBoxInput" 
              placeholder="ابحث هنا"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-100 border-0 bg-transparent"
            />
          </label>
        </form>
        <button onClick={closeSearch} className="search-toggle bg-transparent border-0">
          <i className="icon-arrow-back"></i>
        </button>
      </div>
    </div>
  );
}