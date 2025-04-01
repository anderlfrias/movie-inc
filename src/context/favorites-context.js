import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth-context";
import {
  apiAddMovieToFavorites,
  apiGetFavoritesMovies,
  apiRemoveMovieFromFavorites,
} from "../api/account";
import { mapMovieData } from "../utils/mappers";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { sessionId, account } = useAuth();
  const accountId = account?.id;
  const [favorites, setFavorites] = useState([]);

  const addFavorite = async (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
    const resp = await apiAddMovieToFavorites(accountId, sessionId, movie.id);
    console.log("resp", resp);
    if (!resp.success) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favMovie) => favMovie.id !== movie.id),
      );
    }

    return resp;
  };

  const removeFavorite = async (movieId) => {
    const movieToRemove = favorites.find((movie) => movie.id === movieId);
    if (!movieToRemove) return;
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId),
    );

    console.log("removeFavorite", movieId);
    const resp = await apiRemoveMovieFromFavorites(
      accountId,
      sessionId,
      movieId,
    );
    if (!resp.success) {
      // Si la eliminación falla, revertimos el estado de favoritos
      setFavorites((prevFavorites) => [...prevFavorites, movieToRemove]);
    }

    return resp;
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const fetchFavorites = useCallback(async () => {
    const resp = await apiGetFavoritesMovies(accountId, sessionId);
    if (resp.success) {
      const mappedMovies = resp.data.results.map(mapMovieData).reverse();
      setFavorites(mappedMovies);
    } else {
      console.log("Error al obtener los favoritos");
    }
  }, [accountId, sessionId]);

  useEffect(() => {
    fetchFavorites();
  }, [accountId, sessionId, fetchFavorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
