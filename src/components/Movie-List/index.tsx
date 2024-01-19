import React, { ReactElement } from 'react';
import { Flex } from 'antd';

import MovieCard from '../Movie-Card/index.tsx';
import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  // rating: number;
  movieGenres: (string | undefined)[];
}

// interface MovieList {
//     movies: Movie[];
// }

const movieListStyle: React.CSSProperties = {
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  rowGap: '35px',
  maxWidth: '1010px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

function MovieList(): ReactElement {
  const [movies] = useMovieDBStore((state) => [state.movies]);
  console.log('fuf', movies);
  return (
    <Flex style={movieListStyle}>
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          description={movie.description}
          releaseDate={movie.releaseDate}
          posterUrl={movie.posterUrl}
          movieGenres={movie.movieGenres}
        />
      ))}
    </Flex>
  );
}

export default MovieList;
