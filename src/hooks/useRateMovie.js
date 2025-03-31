import { useState, useEffect } from "react";
import { apiGetMovieAccountStates, apiRateMovie } from "../api/movie";
import useAuth from "./useAuth";
import { Alert } from "react-native";

export function useRateMovie(movieId) {
  const { getSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);

  // Obtener la calificación previa del usuario
  useEffect(() => {
    const fetchUserRating = async () => {
      setLoading(true);
      setError(null);
      const sessionId = await getSession();
      if (!sessionId) {
        setLoading(false);
        setError("No se encontró la sesión del usuario.");
        return;
      }
      const resp = await apiGetMovieAccountStates(movieId, sessionId);
      if (resp.success) {
        const { rated } = resp.data;
        setUserRating(rated ? rated.value : null);
      } else {
        setError(resp.message);
      }
    };

    fetchUserRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  // Función para calificar una película
  const rateMovie = async (rating) => {
    setLoading(true);
    setError(null);
    const sessionId = await getSession();
    if (!sessionId) {
      setLoading(false);
      // Mostrar alerta de que no hay sesión activa
      Alert.alert(
        "No hay sesión activa",
        "Por favor, inicia sesión para calificar la película.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }
    const resp = await apiRateMovie(movieId, rating, sessionId);
    if (resp.success) {
      setUserRating(rating);
    } else {
      setError(resp.message);
    }
    setLoading(false);
  };

  return { rateMovie, loading, error, userRating };
}
