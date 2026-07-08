import { mockMovies } from "@/lib/content";
import Image from "next/image";
import SearchBar from "./search";
import { useRouter } from "next/router";
import { useMemo } from "react";

function MovieCards() {
  const router = useRouter();
  const { search } = router.query;

  // Get search term from URL
  const getSearchTerm = search?.toLocaleLowerCase().trim() || "";

  // Filter movies based on search (professional filtering)

  const searchedMovies = useMemo(() => {
    if (!getSearchTerm) return mockMovies;

    return mockMovies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(getSearchTerm);
      return titleMatch;
    });
  }, [getSearchTerm]);

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
        <SearchBar />

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between text-gray-400">
          {getSearchTerm && (
            <button
              onClick={() => router.push(router.pathname)}
              className="text-sm hover:text-white transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchedMovies.length > 0 ? (
            searchedMovies.map((item) => (
              <div
                key={item.id}
                className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/50"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  <div className="absolute top-4 right-4 bg-black/80 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    ⭐ {item.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-xl text-white line-clamp-2 mb-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>{item.year}</span>
                    <span className="text-emerald-400">{item.language}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-block text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-400">
                No movies found for "{getSearchTerm}"
              </p>
              <p className="text-gray-500 mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCards;
