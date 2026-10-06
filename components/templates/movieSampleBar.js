"use client";

import { useRef } from "react";
import { mockMovies } from "@/lib/content";
import MovieCard from "../modules/movie-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MovieSampleBar() {
  const dramaRef = useRef(null);
  const comedyRef = useRef(null);

  const dramaMovies = mockMovies
    .filter((movie) => movie.genre.includes("Drama"))
    .slice(0, 6);

  const comedyMovies = mockMovies
    .filter((movie) => movie.genre.includes("Comedy"))
    .slice(0, 6);

  const scroll = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction * 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1750px] px-4 sm:px-6 lg:px-10">
        {/* Drama */}
        <div className="mb-14 sm:mb-16">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Featured genre
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Drama
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scroll(dramaRef, -1)}
                aria-label="Previous Drama movies"
                className="rounded-full border border-white/10 bg-white/4 p-2 text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scroll(dramaRef, 1)}
                aria-label="Next Drama movies"
                className="rounded-full border border-white/10 bg-white/4 p-2 text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={dramaRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none sm:gap-5"
          >
            {dramaMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-43 shrink-0 snap-start sm:w-47.5 lg:w-55"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {/* Comedy */}
        <div>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Popular now
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Comedy
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scroll(comedyRef, -1)}
                aria-label="Previous Comedy movies"
                className="rounded-full border border-white/10 bg-white/4 p-2 text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scroll(comedyRef, 1)}
                aria-label="Next Comedy movies"
                className="rounded-full border border-white/10 bg-white/4 p-2 text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={comedyRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none sm:gap-5"
          >
            {comedyMovies.map((movie) => (
              <div
                key={movie.id}
                className="w-42 shrink-0 snap-start sm:w-47.5 lg:w-55"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieSampleBar;