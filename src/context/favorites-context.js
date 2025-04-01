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
    if (!sessionId || !accountId) {
      return {
        success: false,
        message: "Por favor inicie sesión para poder agregar favoritos",
      };
    }
    setFavorites((prevFavorites) => [movie, ...prevFavorites]);
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
    const prevFavorites = [...favorites]; // Guardamos el estado anterior

    // Verificamos si la película está en favoritos antes de intentar eliminarla
    const movieToRemove = favorites.find((movie) => movie.id === movieId);
    if (!movieToRemove) return;

    // Si la película está en favoritos, la eliminamos del estado
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId),
    );

    const resp = await apiRemoveMovieFromFavorites(
      accountId,
      sessionId,
      movieId,
    );
    if (!resp.success) {
      // Si la eliminación falla, revertimos el estado de favoritos
      setFavorites(prevFavorites);
    }

    return resp;
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const fetchFavorites = useCallback(async () => {
    const resp = await apiGetFavoritesMovies(accountId, sessionId);
    console.log("fetchFavorites.resp", resp);
    if (resp.success) {
      console.log("fetchFavorites.resp.success", resp.success);
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
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        refetch: fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
