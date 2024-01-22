import { ReactElement, useEffect, useState } from 'react';
import Layout from 'antd/es/layout/layout';
import { Alert } from 'antd';

import AppHeader from '../App-Header/index.tsx';
import MovieList from '../Movie-List/index.tsx';
import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

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
  const [isError] = useMovieDBStore((state) => [state.isError]);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

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
  if (isOnline) {
    return (
      <div style={appStyleMain}>
        <Layout style={LayoutStyle}>
          <AppHeader
            page={pageNumber}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setCurrentQuery={setCurrentQuery}
          />
          {isError ? (
            <Alert message="Oops!" description="Something went wrong." type="error" showIcon />
          ) : (
            <MovieList page={pageNumber} setPage={setPageNumber} currentQuery={currentQuery} />
          )}
        </Layout>
      </div>
    );
  }
  return (
    <Alert
      message="Error: Web-page is not accessible"
      description="The Movie-app cannot display the web-page because the computer is not connected to the Internet."
      type="error"
      showIcon
    />
  );
}

export default App;
