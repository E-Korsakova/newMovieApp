import { format } from 'date-fns';
import { create } from 'zustand';

import noPosterImage from '../images/no_poster.jpeg';

interface ApiMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  rating: number | undefined;
  genre_ids: number[];
}

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  rating: number;
  userRating: number;
  movieGenres: Map<number, string>;
}

type Headers = {
  accept: string;
};

interface OptionsProps {
  method: string;
  headers: Headers;
}

interface MoviesList {
  isError: boolean;
  isNoResults: boolean;
  _apiBase: string;
  apiKey: string;
  guestSessionId: string;
  options: OptionsProps;
  movies: Movie[];
  ratedMovies: Map<number, number>;
  isLoading: boolean;
  totalResults: number;
  getMovies: (title: string, page: number) => void;
  getRatedMovies: (page: number) => void;
  getGuestSessionId: () => void;
  addRating: (movieId: number, value: number) => void;
}

const useMovieDBStore = create<MoviesList>((set, get) => ({
  isError: false,
  isNoResults: false,
  _apiBase: 'https://api.themoviedb.org/3/search/movie',
  apiKey: '4b7268e646b81e540737938397bc7ab4',
  guestSessionId: '',
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjcyNjhlNjQ2YjgxZTU0MDczNzkzODM5N2JjN2FiNCIsInN1YiI6IjY1OWQxMmM5YzQ5MDQ4MDI1OGFlNjZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIB5h_5UJ_IOlINCwgS3Rb_5NfD1w_5KnczOva2QvFo',
    },
  },
  movies: [],
  ratedMovies: new Map<number, number>(),
  isLoading: false,
  totalResults: 0,

  getMovies: async (title, page) => {
    const { _apiBase, apiKey, options, ratedMovies } = get();
    set({ isLoading: true });
    try {
      const url = `${_apiBase}?api_key=${apiKey}&query=${title}&page=${page}`;
      const res = await fetch(url, options);
      if (!res.ok) set({ isError: true });
      const allMovies = await res.json();
      if (allMovies.results.length === 0) set({ isNoResults: true });
      else set({ isNoResults: false });
      const MovieList: Movie[] = allMovies.results.map((movie: ApiMovie) => {
        let date = '';
        if (movie.release_date) date = format(new Date(movie.release_date), 'MMMM dd, yyyy');

        let desc = movie.overview;
        if (movie.overview.length > 180) {
          desc = `${movie.overview.slice(0, movie.overview.lastIndexOf(' ', 180))}...`;
        }
        const genres: Map<number, string> = new Map(Array.from(movie.genre_ids.map((id) => [id, ''])));
        const newMovie: Movie = {
          id: movie.id,
          title: movie.title,
          description: desc,
          releaseDate: date,
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noPosterImage,
          rating: Math.trunc(movie.vote_average * 10) / 10,
          userRating: ratedMovies.get(movie.id) || 0,
          movieGenres: genres,
        };
        return newMovie;
      });
      set({ movies: MovieList, isLoading: false, totalResults: allMovies.total_results });
    } catch {
      set({ isError: true });
    }
  },

  getRatedMovies: async (page: number) => {
    const { apiKey, guestSessionId, options } = get();
    set({ isLoading: true });
    try {
      const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&page=${page}`;
      const res = await fetch(url, options);
      if (!res.ok) set({ isError: true });
      const allMovies = await res.json();
      if (allMovies.results.length === 0) set({ isNoResults: true });
      else set({ isNoResults: false });
      const MovieList: Movie[] = allMovies.results.map((movie: ApiMovie) => {
        let date = '';
        if (movie.release_date) date = format(new Date(movie.release_date), 'MMMM dd, yyyy');

        let desc = movie.overview;
        if (movie.overview.length > 200) {
          desc = `${movie.overview.slice(0, movie.overview.lastIndexOf(' ', 200))}...`;
        }
        const genres: Map<number, string> = new Map(Array.from(movie.genre_ids.map((id) => [id, ''])));
        const newMovie: Movie = {
          id: movie.id,
          title: movie.title,
          description: desc,
          releaseDate: date,
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noPosterImage,
          rating: Math.trunc(movie.vote_average * 10) / 10,
          userRating: movie.rating || 0,
          movieGenres: genres,
        };
        return newMovie;
      });
      set({ movies: MovieList, isLoading: false, totalResults: allMovies.total_results });
    } catch {
      set({ isError: true });
    }
  },
  getGuestSessionId: async () => {
    const { apiKey, options, ratedMovies } = get();

    set({ isLoading: true });

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
        options
      );
      if (!res.ok) set({ isError: true });
      const resJson = await res.json();
      ratedMovies.clear();
      set({ guestSessionId: resJson.guest_session_id, isLoading: false });
    } catch {
      set({ isError: true });
    }
  },
  addRating: async (movieId, value) => {
    const { apiKey, guestSessionId, ratedMovies } = get();
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value }),
      });

      ratedMovies.set(movieId, value);
      if (!res.ok) set({ isError: true });
    } catch {
      set({ isError: true });
    }
  },
}));

export default useMovieDBStore;
