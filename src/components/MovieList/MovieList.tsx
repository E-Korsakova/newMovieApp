import React, { ReactElement } from 'react';
import { Flex, Spin, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { MovieCard } from '../MovieCard';
import { AppFooter } from '../AppFooter';
import { useMovieDBStore } from '../../data/services/useMovieBDStore';

interface MovieListProps {
  currentTab: string;
  page: number;
  setPage: (newPageNumber: number) => void;
  currentQuery: string;
}

const movieListStyle: React.CSSProperties = {
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  gap: '35px',
  maxWidth: '1010px',
  marginTop: '20px',
  marginLeft: '35px',
};

function MovieList({ currentTab, page, setPage, currentQuery }: MovieListProps): ReactElement {
  const isMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const [isNoResults, movies, isLoading] = useMovieDBStore((state) => [
    state.isNoResults,
    state.movies,
    state.isLoading,
    state.totalResults,
  ]);

  const movieCards = movies.map((movie) => {
    const genres: number[] = Array.from(movie.movieGenres.keys());
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        rating={movie.rating}
        userRating={movie.userRating}
        description={movie.description}
        releaseDate={movie.releaseDate}
        posterUrl={movie.posterUrl}
        movieGenres={genres}
      />
    );
  });

  return (
    <>
      {isLoading && <Spin size="large" style={{ marginTop: '20px' }} />}
      {isNoResults && !isLoading && currentQuery && currentTab === '1' && (
        <Typography.Text>По запросу &ldquo;{currentQuery}&ldquo; ничего не найдено.</Typography.Text>
      )}
      {isNoResults && !isLoading && currentQuery && currentTab === '2' && (
        <Typography.Text>Здесь пока нет ни одного фильма.</Typography.Text>
      )}
      {!isLoading && (
        <>
          <Flex style={isMobile ? { ...movieListStyle, justifyContent: 'center' } : movieListStyle}>{movieCards}</Flex>
          {movies[0] && <AppFooter page={page} setPage={setPage} currentQuery={currentQuery} currentTab={currentTab} />}
        </>
      )}
    </>
  );
}

export { MovieList };
