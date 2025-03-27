import { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '../api/tmdb';
import { POSTER_URL } from '../constants';

function mapMovieData(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    language: movie.original_language,
    overview: movie.overview || '',
    vote: {
      average: movie.vote_average,
      count: movie.vote_count
    },
    poster: {
      path: movie.poster_path,
      url: `${POSTER_URL}${movie.poster_path}`
    },
    backdrop: {
      path: movie.backdrop_path,
      url: `${POSTER_URL}${movie.backdrop_path}`
    },
    genres: movie.genre_ids,
    popularity: movie.popularity,
    isAdult: movie.adult,
    video: movie.video
  };
}

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const moviesData = await getNowPlayingMovies();

      const mappedMovies = moviesData.map(mapMovieData).sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setMovies(mappedMovies);
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, refetch: fetchMovies };
}