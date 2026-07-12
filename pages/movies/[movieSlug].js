import MovieDetails from "@/components/templates/MovieDetails";
import { mockMovies } from "@/lib/content";
import { editSlug } from "@/lib/handyfun";
import { useRouter } from "next/router";


function MovieDetailedPage() {
  const router = useRouter();
  const { movieSlug } = router.query;

  const movie = mockMovies.find((intro)=> editSlug(intro.title) === movieSlug)

  if (!movieSlug) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <MovieDetails movie={movie} />
    </div>
  );
}

export default MovieDetailedPage;
