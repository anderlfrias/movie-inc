import { POSTER_URL } from "../constants";

export function mapMovieData(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    year: new Date(movie.release_date).getFullYear(),
    language: movie.original_language,
    overview: movie.overview || "",
    vote: {
      average: movie.vote_average.toFixed(1),
      count: movie.vote_count,
    },
    poster: {
      path: movie.poster_path,
      url: `${POSTER_URL}${movie.poster_path}`,
    },
    backdrop: {
      path: movie.backdrop_path,
      url: `${POSTER_URL}${movie.backdrop_path}`,
    },
    genres: movie.genre_ids,
    popularity: movie.popularity,
    isAdult: movie.adult,
    video: movie.video,
  };
}

export function mapMovieDetailData(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    year: new Date(movie.release_date).getFullYear(),
    language: movie.original_language,
    overview: movie.overview || "",
    vote: {
      average: movie.vote_average.toFixed(1),
      count: movie.vote_count,
    },
    poster: {
      path: movie.poster_path,
      url: movie.poster_path ? `${POSTER_URL}${movie.poster_path}` : null,
    },
    backdrop: {
      path: movie.backdrop_path,
      url: movie.backdrop_path ? `${POSTER_URL}${movie.backdrop_path}` : null,
    },
    genres: movie.genres,
    popularity: movie.popularity,
    isAdult: movie.adult,
    video: movie.video,
    runtime: movie.runtime,
    actors: movie.credits.cast.map((actor) => ({
      ...actor,
      profile: actor.profile_path ? `${POSTER_URL}${actor.profile_path}` : null,
    })),
    crew: movie.credits.crew.map((member) => ({
      ...member,
      profile: member.profile_path
        ? `${POSTER_URL}${member.profile_path}`
        : null,
    })),
  };
}
