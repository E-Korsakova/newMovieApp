import { ReactElement, useState } from 'react';
import Layout from 'antd/es/layout/layout';

import AppHeader from '../App-Header/index.tsx';
import MovieList from '../Movie-List/index.tsx';

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
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  return (
    <div style={appStyleMain}>
      <Layout style={LayoutStyle}>
        <AppHeader
          page={pageNumber}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCurrentQuery={setCurrentQuery}
        />
        <MovieList page={pageNumber} setPage={setPageNumber} currentQuery={currentQuery} />
      </Layout>
    </div>
  );
}

export default App;
