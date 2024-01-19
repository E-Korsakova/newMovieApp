import { Pagination } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { ReactElement } from 'react';

interface AppFooterProps {
  page: number;
  setPage: (page: number) => void;
}

const footerStyle: React.CSSProperties = {
  backgroundColor: 'white',
};

function AppFooter({ page, setPage }: AppFooterProps): ReactElement {
  return (
    <Footer style={footerStyle}>
      <Pagination
        defaultCurrent={page}
        total={50}
        // defaultPageSize={20}
        onChange={(current) => {
          setPage(current);
        }}
      />
    </Footer>
  );
}
export default AppFooter;
