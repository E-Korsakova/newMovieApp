import { Pagination } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { ReactElement } from 'react';

import { useMovieDBStore } from '../../data/services/useMovieBDStore';

interface AppFooterProps {
  page: number;
  // ratedPage: number;
  currentQuery: string;
  setPage: (page: number) => void;
  currentTab: string;
}

const footerStyle: React.CSSProperties = {
  backgroundColor: 'white',
};

function AppFooter({ page, currentQuery, setPage, currentTab }: AppFooterProps): ReactElement {
  const [totalResults, getMovies, getRatedMovies] = useMovieDBStore((state) => [
    state.totalResults,
    state.getMovies,
    state.getRatedMovies,
  ]);
  return (
    <Footer style={footerStyle}>
      <Pagination
        defaultCurrent={page}
        total={totalResults}
        defaultPageSize={20}
        showSizeChanger={false}
        onChange={(current) => {
          setPage(current);
          if (currentTab === '1') {
            getMovies(currentQuery, current);
          } else {
            getRatedMovies(current);
          }
        }}
      />
    </Footer>
  );
}

export { AppFooter };
