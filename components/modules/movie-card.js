import { editSlug } from "@/lib/form-tools";
import Image from "next/image";
import Link from "next/link";

function MovieCard({ movie }) {
  const slug = editSlug(movie.title);

  return (
    <div
      className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 
                 hover:border-purple-600 transition-all duration-300 
                 hover:shadow-xl hover:shadow-purple-950/50"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Link href={`/movies/${slug}`}>
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        <div className="absolute top-4 right-4 bg-black/80 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl text-white line-clamp-2 mb-2 group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>

        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>{movie.year}</span>
          <span className="text-emerald-400">{movie.language}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genre.map((genre, index) => (
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
  );
}

export default MovieCard;
