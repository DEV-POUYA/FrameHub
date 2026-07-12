import { mockMovies } from "@/lib/content";
import SearchBar from "../modules/search";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Filters from "../modules/filters";
import MovieCard from "../modules/movie-card";

function MovieBox() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // pagination
  const ITEMS_PER_LOAD = 12;
 
  const router = useRouter();
  const { search, year, genre } = router.query;

  useEffect(() => {
    setSelectedGenre(genre);
    setSelectedYear(year);
    setSearchTerm(search);
    setVisibleCount(12)
  }, [genre, year, search]);

  const filteredMovies = useMemo(() => {
    let result = [...mockMovies];

    // Search
    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    //   Genre Filter
    if (selectedGenre) {
      result = result.filter((movie) =>
        movie.genre.some((g) => g === selectedGenre),
      );
    }

    // Year Filter
    if (selectedYear) {
      switch (selectedYear) {
        case "newest":
          result = result.filter((movie) => movie.year >= 2020);
          break;
        case "middle":
          result = result.filter(
            (movie) => movie.year >= 2000 && movie.year <= 2019,
          );
          break;
        case "oldest":
          result = result.filter((movie) => movie.year < 2000);
          break;
      }
    }

    return result;
  }, [selectedGenre, selectedYear, searchTerm]);

  const updateFilters = useCallback(
    (newSearch, newGenre, newYear) => {
      const query = {};

      if (newSearch?.trim()) query.search = newSearch.trim();
      if (newGenre) query.genre = newGenre;
      if (newYear) query.year = newYear;

      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  const handleSearchSubmit = () => {
    updateFilters(searchTerm, selectedGenre, selectedYear);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    updateFilters(searchTerm, value, selectedYear);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    updateFilters(searchTerm, selectedGenre, value);
  };

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedYear("");
    updateFilters(searchTerm, "", "");
  };

  const displayedMovies = useMemo(() => {
    return filteredMovies.slice(0, visibleCount);
  }, [filteredMovies, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Movies Collection
          </h1>
          <p className="text-gray-400 text-lg">
            Handpicked cinematic masterpieces
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearchSubmit}
        />
        <Filters
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onReset={handleReset}
        />

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {visibleCount < filteredMovies.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 
                 text-white font-medium rounded-2xl transition-all duration-200 
                 text-lg flex items-center gap-3 group"
            >
              See More Movies
              <span className="group-hover:translate-y-0.5 transition-transform">
                ↓
              </span>
            </button>
          </div>
        )}

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No movies found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieBox;
