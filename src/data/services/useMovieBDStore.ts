import { format } from 'date-fns';
import { create } from 'zustand';

import noPosterImage from '../images/no_poster.jpeg';

interface Genre {
  id: number;
  name: string;
}

interface ApiMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  rating: number;
  movieGenres: (string | undefined)[];
}

type Headers = {
  accept: string;
  Authorization: string;
};

interface OptionsProps {
  method: string;
  headers: Headers;
}

interface MoviesList {
  isError: boolean;
  isNoResults: boolean;
  apiBase: string;
  options: OptionsProps;
  movies: Movie[];
  genres: Map<number, string>;
  isLoading: boolean;
  totalResults: number;
  getMovies: (title: string, page: number) => void;
  setGenres: () => Promise<void>;
}

const useMovieDBStore = create<MoviesList>((set, get) => ({
  isError: false,
  isNoResults: false,
  apiBase: 'https://api.themoviedb.org/3/search/movie',
  options: {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjcyNjhlNjQ2YjgxZTU0MDczNzkzODM5N2JjN2FiNCIsInN1YiI6IjY1OWQxMmM5YzQ5MDQ4MDI1OGFlNjZkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIB5h_5UJ_IOlINCwgS3Rb_5NfD1w_5KnczOva2QvFo',
    },
  },
  movies: [],
  genres: new Map<number, string>(),
  isLoading: false,
  totalResults: 0,

  setGenres: async (): Promise<void> => {
    const { options } = get();
    try {
      const res = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
      if (!res.ok) set({ isError: true });
      const allGenres = await res.json();
      const mapGenres = new Map<number, string>();
      allGenres.genres.forEach((genre: Genre) => {
        mapGenres.set(genre.id, genre.name);
      });
      set({ genres: mapGenres });
    } catch {
      set({ isError: true });
    }
  },

  getMovies: async (title, page) => {
    const { apiBase, options, genres } = get();
    set({ isLoading: true });
    try {
      const url = `${apiBase}?query=${title}&page=${page}`;
      const res = await fetch(url, options);
      if (!res.ok) set({ isError: true });
      const allMovies = await res.json();
      if (allMovies.results.length === 0) set({ isNoResults: true });
      const MovieList: Movie[] = allMovies.results.map((movie: ApiMovie) => {
        let date = '';
        if (movie.release_date) date = format(new Date(movie.release_date), 'MMMM dd, yyyy');
        const movieGens = movie.genre_ids.map((id: number) => genres.get(id));

        let desc = movie.overview;
        if (movie.overview.length > 220) {
          desc = `${movie.overview.slice(0, movie.overview.lastIndexOf(' ', 220))}...`;
        }

        const newMovie: Movie = {
          id: movie.id,
          title: movie.title,
          description: desc,
          releaseDate: date,
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noPosterImage,
          rating: movie.vote_average,
          movieGenres: movieGens,
        };
        return newMovie;
      });
      set({ movies: MovieList, isLoading: false, totalResults: allMovies.total_results });
    } catch {
      set({ isError: true });
    }
  },
}));

export default useMovieDBStore;
