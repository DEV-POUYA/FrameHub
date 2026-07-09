function SearchBar({ searchTerm, onSearchChange, onSearchSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="mb-12">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={onSearchSubmit} className="relative">
          <div className="relative group">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search movies, actors, or genres..."
              className="w-full bg-gray-900 border border-gray-700 focus:border-purple-500 
                         rounded-3xl px-8 py-5 text-lg text-white placeholder-gray-400 
                         outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/30"
            />
            
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 
                         bg-purple-600 hover:bg-purple-500 active:bg-purple-700 
                         text-white font-medium px-8 py-3 rounded-2xl 
                         transition-all duration-200 text-base disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
