import { useMemo, useState } from "react";
import { mockMovies } from "@/lib/content";

function Filters() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filteredMovies = useMemo(() => {
    let result = [...mockMovies];

    //   Genre Filter
    if (selectedGenre) {
      result = result.filter((movie) =>
        movie.genre.some((g) => g === selectedGenre),
      );
    }

    //   Year Filter
    if (selectedYear) {
      switch (selectedYear) {
        case "newest":
          result = result.filter((movie) => movie.year >= 2020);
          break;
        case "middle":
          result = result.filter((movie) => movie.year >= 2000);
          break;
        case "oldest":
          result = result.filter((movie) => movie.year < 2000);
          break;
      }
    }

    return result;
  }, [selectedGenre, selectedYear]);

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedYear("");
  };

  const hasActiveFilter = selectedGenre || selectedYear;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        {/* Genre Filter */}
        <div className="flex-1">
          <label className="block text-xl text-white mb-2 pl-1">Genre</label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-gray-400 border border-gray-700 focus:border-purple-500 
                rounded-2xl px-6 py-4 text-base outline-none cursor-pointer 
                transition-all duration-300 appearance-none"
          >
            <option value="">All Genres</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Crime">Crime</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
        {/* Sort Filter */}
        <div className="flex-1">
          <label className="block text-xl text-white mb-2 pl-1">Sort By</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-gray-400 border border-gray-700 focus:border-purple-500 
                rounded-2xl px-6 py-4 text-base outline-none cursor-pointer 
                transition-all duration-300 appearance-none"
          >
            <option value="">Sort By Year</option>
            <option value="newest">Newest Era</option>
            <option value="oldest">Oldest Era</option>
            <option value="rating-high">Middle Era</option>
          </select>
        </div>
        {hasActiveFilter && (
          <div className="flex items-end pb-1">
            <button
              className="px-5 py-3 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium underline-offset-4 hover:underline"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Filters;
