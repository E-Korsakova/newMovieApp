import React, { ReactElement, useEffect } from 'react';
import { Flex } from 'antd';

import MovieCard from '../Movie-Card/index.tsx';
import AppFooter from '../App-Footer/index.tsx';
import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

interface MovieProps {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  // rating: number;
  movieGenres: (string | undefined)[];
}

interface MovieListProps {
  page: number;
  setPage: (newPageNumber: number) => void;
  currentQuery: string;
}

const movieListStyle: React.CSSProperties = {
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  rowGap: '35px',
  maxWidth: '1010px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

function MovieList({ page, setPage, currentQuery }: MovieListProps): ReactElement {
  const [movies, setGenres] = useMovieDBStore((state) => [state.movies, state.setGenres]);
  useEffect(() => {
    setGenres();
  }, [setGenres]);
  //   console.log(movies);
  return (
    <>
      <Flex style={movieListStyle}>
        {movies.map((movie: MovieProps) => (
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
      {movies[0] && <AppFooter page={page} setPage={setPage} currentQuery={currentQuery} />}
    </>
  );
}

export default MovieList;
