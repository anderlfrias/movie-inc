import { useState, useEffect } from "react";
import { apiGetMovies } from "../api/movie";
import { mapMovieData } from "../utils/mappers";

export function useSearchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    const resp = await apiGetMovies();
    if (resp.success) {
      const mappedMovies = resp.data.results
        .map(mapMovieData)
        .sort((a, b) => a.title.localeCompare(b.title));

      setMovies(mappedMovies);
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
