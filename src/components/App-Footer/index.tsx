import { Pagination } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { ReactElement } from 'react';

import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

interface AppFooterProps {
  page: number;
  currentQuery: string;
  setPage: (page: number) => void;
}

const footerStyle: React.CSSProperties = {
  backgroundColor: 'white',
};

function AppFooter({ page, currentQuery, setPage }: AppFooterProps): ReactElement {
  const [getMovies] = useMovieDBStore((state) => [state.getMovies]);
  return (
    <Footer style={footerStyle}>
      <Pagination
        defaultCurrent={page}
        total={50}
        // defaultPageSize={20}
        onChange={(current) => {
          setPage(current);
          getMovies(currentQuery, current);
        }}
      />
    </Footer>
  );
}
export default AppFooter;
