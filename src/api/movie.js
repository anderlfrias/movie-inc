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
