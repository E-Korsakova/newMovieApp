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
  const [totalResults, getMovies] = useMovieDBStore((state) => [state.totalResults, state.getMovies]);
  return (
    <Footer style={footerStyle}>
      <Pagination
        defaultCurrent={page}
        total={totalResults}
        defaultPageSize={20}
        showSizeChanger={false}
        onChange={(current) => {
          setPage(current);
          getMovies(currentQuery, current);
        }}
      />
    </Footer>
  );
}
export default AppFooter;
