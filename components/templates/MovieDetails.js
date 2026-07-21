import Image from "next/image";
import Link from "next/link";

function MovieDetails({ movie, isAuth }) {
  if (!movie) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-2xl">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Poster Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="relative aspect-2/3 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-800">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-4">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="text-2xl">{movie.year}</span>
                  <span className="text-emerald-400 font-medium">
                    {movie.language}
                  </span>
                  {movie.rating && (
                    <span className="flex items-center gap-1">
                      ⭐ <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-800 text-gray-300 text-sm px-4 py-1.5 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-200">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.description}
                </p>
              </div>

              {/* Cast & Creator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-gray-800">
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Creator</h4>
                  <p className="text-white text-lg">{movie.creator}</p>
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Cast</h4>
                  <p className="text-white text-lg leading-relaxed">
                    {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment / Review Section */}
        <div className="mt-20 max-w-3xl">
          <h3 className="text-2xl font-semibold mb-6">Share Your Thoughts</h3>

          {isAuth ? (
            <>
              <p className="text-gray-400 mb-4">
                Write your vision or review about this movie/series
              </p>
              <textarea
                name="postContent"
                rows={6}
                className="w-full bg-gray-900 border border-gray-700 focus:border-purple-500 
                           rounded-3xl px-6 py-5 text-white placeholder-gray-400 
                           outline-none resize-y min-h-35 transition-all"
                placeholder="What did you think about this masterpiece?..."
              />
              <button className="mt-4 bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-2xl font-medium transition-colors">
                Post Review
              </button>
            </>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 text-center">
              <p className="text-xl text-gray-300 mb-4">
                You must sign in to share your thoughts
              </p>
              <Link
                href="/signin"
                className="inline-block mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl font-medium transition-colors"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;