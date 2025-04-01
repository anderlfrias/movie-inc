import { apiRequest } from ".";

export async function apiGetAccountBySessionId(sessionId) {
  return await apiRequest({
    path: `/account`,
    method: "GET",
    params: {
      session_id: sessionId,
    },
  });
}

export async function apiGetFavoritesMovies(account_id, sessionId) {
  return await apiRequest({
    path: `/account/${account_id}/favorite/movies`,
    method: "GET",
    params: { session_id: sessionId, language: "es-ES" },
  });
}

export async function apiAddMovieToFavorites(account_id, session_id, movie_id) {
  return await apiRequest({
    path: `/account/${account_id}/favorite`,
    method: "POST",
    body: {
      media_type: "movie",
      media_id: movie_id,
      favorite: true,
    },
    params: {
      session_id: session_id,
    },
  });
}

export async function apiRemoveMovieFromFavorites(
  account_id,
  session_id,
  movie_id,
) {
  return await apiRequest({
    path: `/account/${account_id}/favorite`,
    method: "POST",
    body: {
      media_type: "movie",
      media_id: movie_id,
      favorite: false,
    },
    params: {
      session_id: session_id,
    },
  });
}
