import { useEffect, useMemo, useState } from "react";
import { mockMovies } from "@/lib/content";
import { useRouter } from "next/router";

function Filters({
  selectedGenre,
  selectedYear,
  onGenreChange,
  onYearChange,
  onReset,
}) {
  const hasActiveFilter = selectedGenre || selectedYear;

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row gap-6 max-w-3xl mx-auto">
        {/* Genre Filter */}
        <div className="flex-1">
          <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2 pl-1">
            Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-purple-500 
                       rounded-2xl px-6 py-4 text-base outline-none cursor-pointer 
                       transition-all duration-300 appearance-none text-white"
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

        {/* Era / Year Filter */}
        <div className="flex-1">
          <label className="block text-sm uppercase tracking-widest text-gray-400 mb-2 pl-1">
            Era
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 focus:border-purple-500 
                       rounded-2xl px-6 py-4 text-base outline-none cursor-pointer 
                       transition-all duration-300 appearance-none text-white"
          >
            <option value="">All Eras</option>
            <option value="newest">Newest Era</option>
            <option value="middle">Middle Era</option>
            <option value="oldest">Oldest Era</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilter && (
          <div className="flex items-end">
            <button
              onClick={onReset}
              className="px-6 py-4 text-purple-400 hover:text-purple-300 
                         transition-colors text-sm font-medium underline-offset-4 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;
