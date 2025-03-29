import { useCallback, useEffect, useState } from "react";
import { getMovieDetails } from "../api/movie";
import { mapMovieDetailData } from "../utils/mappers";

export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    const resp = await getMovieDetails(movieId);

    if (resp.success) {
      const mappedMovie = mapMovieDetailData(resp.data);
      setMovie(mappedMovie);
    } else {
      setError(resp.error.toString());
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    if (movieId) fetchMovieDetails();
  }, [movieId, fetchMovieDetails]);

  return { movie, loading, error, refetch: fetchMovieDetails };
}
