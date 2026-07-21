import MovieDetails from "@/components/templates/MovieDetails";
import { mockMovies } from "@/lib/content";
import { editSlug } from "@/lib/form-tools";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MovieDetailedPage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setIsAuth(data.status === "success"))
      .catch((err) => {
        console.error("error in page access:", err);
      });
  }, []);

  const router = useRouter();
  const { movieSlug } = router.query;

  const movie = mockMovies.find((intro) => editSlug(intro.title) === movieSlug);

  if (!movieSlug) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <MovieDetails movie={movie} isAuth={isAuth} />
    </div>
  );
}

export default MovieDetailedPage;
