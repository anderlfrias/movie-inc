import { useState, useEffect } from "react";
import { apiGetMoviesRecomendatios } from "../api/movie";
import { mapMovieData } from "../utils/mappers";

export function useRecomendations(movieId) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    const resp = await apiGetMoviesRecomendatios(movieId);
    if (resp.success) {
      setMovies(resp.data.results.map(mapMovieData));
    } else {
      setError(resp.error.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, refetch: fetchMovies };
}
