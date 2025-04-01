import { apiRequest } from ".";

export const apiGetNowPlayingMovies = async () => {
  return await apiRequest({
    path: "/movie/now_playing",
    params: { language: "es-ES" },
  });
};

export const apiGetMovieDetails = async (movieId) => {
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
};

export const apiGetMovies = async (query) => {
  return await apiRequest({
    path: "/search/movie",
    params: { language: "es-ES", query, include_adult: true },
  });
};
