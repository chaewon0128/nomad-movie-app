import { getPopular } from "../api";
import MovieList from "../component/movieList/MovieList";

export default function ComingSoon() {

  const QUERY_KEY = "popular";

  return (
    <>
      <MovieList apiFn={getPopular} type={""} QUERY_KEY={QUERY_KEY} />

    </>
  );
}
