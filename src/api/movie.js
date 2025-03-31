import { apiRequest } from ".";

export const getNowPlayingMovies = async () => {
  return await apiRequest({
    path: "/movie/now_playing",
    params: { language: "es-ES" },
  });
};

export const getMovieDetails = async (movieId) => {
  return await apiRequest({
    path: `/movie/${movieId}`,
    params: { language: "es-ES", append_to_response: "credits" },
  });
};

export const apiGetMovieAccountStates = async (movieId, sessionId) => {
  return await apiRequest({
    path: `/movie/${movieId}/account_states`,
    method: "GET",
    params: {
      session_id: sessionId,
    },
  });
};

export const apiRateMovie = async (movieId, rating, sessionId) => {
  return await apiRequest({
    path: `/movie/${movieId}/rating`,
    method: "POST",
    params: {
      session_id: sessionId,
    },
    body: {
      value: rating,
    },
  });
};

export const apiGetMoviesRecomendatios = async (movieId) => {
  return await apiRequest({
    path: `/movie/${movieId}/recommendations`,
    params: { language: "es-ES" },
  });
}
