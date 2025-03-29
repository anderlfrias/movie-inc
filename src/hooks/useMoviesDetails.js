import { useCallback, useEffect, useState } from "react";
import { POSTER_URL } from "../constants";
import { getMovieDetails } from "../api/movie";

function mapMovieDetailData(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    year: new Date(movie.release_date).getFullYear(),
    language: movie.original_language,
    overview: movie.overview || "",
    vote: {
      average: movie.vote_average,
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
    genres: movie.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),
    popularity: movie.popularity,
    isAdult: movie.adult,
    video: movie.video,
    runtime: movie.runtime,
    cast: movie.credits.cast.map((actor) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile: actor.profile_path ? `${POSTER_URL}${actor.profile_path}` : null,
    })),
    crew: movie.credits.crew.map((member) => ({
      id: member.id,
      name: member.name,
      department: member.department,
      job: member.job,
    })),
  };
}

export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    const resp = await getMovieDetails(movieId);

    if (resp.success) {
      const mappedMovie = mapMovieDetailData(resp.data);
      setMovie(mappedMovie);
    } else {
      setError(resp.error.toString());
    }
    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    if (movieId) fetchMovieDetails();
  }, [movieId, fetchMovieDetails]);

  return { movie, loading, error, refetch: fetchMovieDetails };
}
