import { ReactElement, useContext, useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import { Alert } from 'antd';

import AppHeader from '../App-Header/index.tsx';
import MovieList from '../Movie-List/index.tsx';
import useMovieDBStore from '../../data/services/useMovieBDStore.ts';
import GenresContext from '../../data/GenresContext.ts';

interface Genre {
  id: number;
  name: string;
}

const appStyleMain: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#F7F7F7',
};

const LayoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  maxWidth: '1010px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  backgroundColor: 'white',
};

function App(): ReactElement {
  const [isError, options, apiKey, getGuestSessionId] = useMovieDBStore((state) => [
    state.isError,
    state.options,
    state.apiKey,
    state.getGuestSessionId,
  ]);
  const [pageNumber, setPageNumber] = useState(1);
  const [ratedPageNumber, setRatedPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [tabKey, setTabKey] = useState('1');
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [genresErr, setGenresErr] = useState(false);
  const allGenres = useContext(GenresContext);

  useEffect(() => {
    getGuestSessionId();
  }, [getGuestSessionId]);

  useEffect(() => {
    const setGenres = async (): Promise<void> => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, options);
      if (!res.ok) setGenresErr(true);
      const getGenres = await res.json();
      getGenres.genres.forEach((genre: Genre) => {
        allGenres.set(genre.id, genre.name);
      });
    };

    try {
      setGenres();
    } catch {
      setGenresErr(true);
    }
  }, [options, allGenres, apiKey]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    setCurrentQuery(inputValue);
  }, [inputValue]);
  return isOnline ? (
    <div style={appStyleMain}>
      <Layout style={LayoutStyle}>
        <AppHeader
          page={pageNumber}
          ratedPage={ratedPageNumber}
          tabKey={tabKey}
          setTabKey={setTabKey}
          inputValue={inputValue}
          // currentQuery={currentQuery}
          setInputValue={setInputValue}
          setCurrentQuery={setCurrentQuery}
        />
        {isError || genresErr ? (
          <Alert message="Oops!" description="Something went wrong." type="error" showIcon />
        ) : (
          <GenresContext.Provider value={allGenres}>
            <MovieList
              currentTab={tabKey}
              page={tabKey === '1' ? pageNumber : ratedPageNumber}
              setPage={tabKey === '1' ? setPageNumber : setRatedPageNumber}
              currentQuery={currentQuery}
            />
          </GenresContext.Provider>
        )}
      </Layout>
    </div>
  ) : (
    <Alert
      message="Error: Web-page is not accessible"
      description="The Movie-app cannot display the web-page because the computer is not connected to the Internet."
      type="error"
      showIcon
    />
  );
}
export default App;
