import { Input, Tabs, TabsProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import debounce from 'lodash.debounce';

import { useMovieDBStore } from '../../data/services/useMovieBDStore';

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

interface AppHeaderProps {
  page: number;
  ratedPage: number;
  tabKey: string;
  setTabKey: (newValue: string) => void;
  inputValue: string;
  // currentQuery: string;
  setInputValue: (newValue: string) => void;
  setCurrentQuery: (newValue: string) => void;
}

const appHeaderStyle: React.CSSProperties = {
  backgroundColor: 'white',
  minHeight: '110px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '40px',
};

function AppHeader({
  page,
  ratedPage,
  tabKey,
  setTabKey,
  inputValue,
  // currentQuery,
  setInputValue,
  setCurrentQuery,
}: AppHeaderProps): ReactElement {
  const isMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const [getMovies, getRatedMovies] = useMovieDBStore((state) => [state.getMovies, state.getRatedMovies]);

  const onInputChange = debounce((evt: React.ChangeEvent<HTMLInputElement>) => {
    getMovies(evt.target.value, page);
  }, 600);

  return (
    <Header style={isMobile ? { ...appHeaderStyle, padding: '0 10px' } : appHeaderStyle}>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="1"
        items={tabItems}
        onChange={(key) => {
          setTabKey(key);
          setCurrentQuery(inputValue);
          if (key === '1') {
            getMovies(inputValue, page);
          }
          if (key === '2') {
            getRatedMovies(ratedPage);
          }
        }}
      />
      {tabKey === '1' && (
        <Input
          placeholder="Type to search..."
          onChange={(evt) => {
            setInputValue(evt.target.value);
            onInputChange(evt);
          }}
          value={inputValue}
          onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (evt.key === 'Enter') {
              getMovies(inputValue, page);
              setCurrentQuery(inputValue);
              setInputValue('');
            }
          }}
        />
      )}
    </Header>
  );
}

export { AppHeader };
