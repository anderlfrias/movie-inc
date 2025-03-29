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
    params: { language: "es-Es", append_to_response: "credits" },
  });
};

export const rateMovieAsGuest = async (movieId, rating, guestSessionId) => {
  return await apiRequest({
    path: `/movie/${movieId}/rating`,
    method: "POST",
    params: {
      guest_session_id: guestSessionId,
    },
    body: {
      value: rating * 2, // TMDB usa una escala de 0 a 10 y nosotros de 0 a 5
    },
  });
};
