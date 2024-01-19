import { ReactElement, useState } from 'react';
import Layout from 'antd/es/layout/layout';

import AppHeader from '../App-Header/index.tsx';
import AppFooter from '../App-Footer/index.tsx';
import MovieList from '../Movie-List/index.tsx';

const appStyleMain: React.CSSProperties = {
  backgroundColor: '#F7F7F7',
};

const LayoutStyle: React.CSSProperties = {
  maxWidth: '1010px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  backgroundColor: 'white',
};

function App(): ReactElement {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div style={appStyleMain}>
      <Layout style={LayoutStyle}>
        <AppHeader page={pageNumber} />
        <AppFooter page={pageNumber} setPage={setPageNumber} />
        <MovieList />
      </Layout>
    </div>
  );
}

export default App;
