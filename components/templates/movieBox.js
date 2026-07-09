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

  const router = useRouter();
  const { search, year, genre } = router.query;

  useEffect(() => {
    setSelectedGenre(genre);
    setSelectedYear(year);
    setSearchTerm(search);
  }, [genre, year , search]);



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
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-400">No movies found</p>
              <p className="text-gray-500 mt-2">Try changing your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieBox;
