import { Input, Tabs, TabsProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';

import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

const onChange = (key: string): void => {
  console.log(key);
};

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
  inputValue: string;
  setInputValue: (newValue: string) => void;
  setCurrentQuery: (newValue: string) => void;
}

const appHeaderStyle: React.CSSProperties = {
  backgroundColor: 'white',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function AppHeader({ page, inputValue, setInputValue, setCurrentQuery }: AppHeaderProps): ReactElement {
  const isMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const [getMovies] = useMovieDBStore((state) => [state.getMovies]);

  return (
    <Header style={isMobile ? { ...appHeaderStyle, padding: '0 10px' } : appHeaderStyle}>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
      <Input
        placeholder="Type to search..."
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            getMovies(inputValue, page);
            setCurrentQuery(inputValue);
            setInputValue('');
          }
        }}
      />
    </Header>
  );
}

export default AppHeader;
