import { useCallback, useEffect, useState } from "react";
import { apiGetFavoritesMovies } from "../api/account";
import { useAuth } from "../context/auth-context";
import { mapMovieData } from "../utils/mappers";

export function useFavoritesMovies() {
  const {
    sessionId,
    account: { id: accountId },
  } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (sessionId, accountId) => {
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
  }, []);

  useEffect(() => {
    fetchMovies(sessionId, accountId);
  }, [sessionId, accountId, fetchMovies]);

  return { movies, loading, error, refetch: fetchMovies };
}
