import { API_KEY, API_URL } from "../constants";

const buildUrl = (endpoint, params = {}) => {
  let url = `${API_URL}${endpoint}`;
  const queryParams = [`api_key=${API_KEY}`, `language=es-ES`];
  Object.keys(params).forEach((key) => {
    queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
  });
  return `${url}?${queryParams.join("&")}`;
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch(buildUrl("/movie/now_playing"));
    if (!response.ok) throw new Error("Error al obtener películas");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error en getNowPlayingMovies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      buildUrl(`/movie/${movieId}`, { append_to_response: "credits" }),
    );
    if (!response.ok) throw new Error("Error al obtener detalles");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getMovieDetails:", error);
    throw error;
  }
};
