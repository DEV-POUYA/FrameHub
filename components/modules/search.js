import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Filters from "./filters";

function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Sync URL query → local state (handles direct links, back/forward navigation)
  useEffect(() => {
    const { search } = router.query;
    setSearchTerm(search || "");
  }, [router.query.search]);

  // Perform Search + Auto Clear
  const performSearch = useCallback(() => {
    const trimSearchValue = searchTerm.trim();

    const newQuery = { ...router.query };

    if (trimSearchValue) {
      newQuery.search = trimSearchValue;
    } else {
      delete newQuery.search;
    }

    
    // result of code: /movies?search=searchedValueByUser
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });

    // Auto clear input after search
    setSearchTerm("");
  }, [router, searchTerm]);

  // Handle form submission + Enter key
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="bg-gray-950 py-12 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Search Section - Most Prominent */}
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="relative">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search movies, genres, years..."
                  className="w-full bg-gray-900/80 backdrop-blur-md text-white placeholder-gray-400 
                             border border-gray-700 focus:border-purple-500 
                             rounded-3xl px-8 py-5 text-lg outline-none 
                             transition-all duration-300 shadow-inner
                             focus:shadow-xl focus:shadow-purple-500/10"
                />
              </div>

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           bg-purple-600 hover:bg-purple-500 active:bg-purple-700 
                           text-white font-medium px-8 py-3 rounded-2xl 
                           transition-all duration-200 text-base"
              >
                Search
              </button>
            </form>
          </div>
          <Filters />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
