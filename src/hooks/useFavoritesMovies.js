import { useEffect, useState } from "react";
import { apiGetFavoritesMovies } from "../api/account";
import useAuth from "./useAuth";

export function useFavoritesMovies() {
  const { sessionId, accountId } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (sessionId) => {
    console.log("useFavoritesMovies.fetchMovies", accountId, sessionId);
    setLoading(true);
    setError(null);

    const resp = await apiGetFavoritesMovies(accountId, sessionId);
    console.log("resp", resp);
    if (resp.success) {
      const mappedMovies = resp.data.results.map(mapMovieData);
      setMovies(mappedMovies);
    } else {
      setError(resp.error.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(sessionId);
  }, [sessionId]);

  return { movies, loading, error, refetch: fetchMovies };
}
