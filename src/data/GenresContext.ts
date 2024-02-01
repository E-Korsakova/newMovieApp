import { createContext } from 'react';

const GenresContext = createContext(new Map<number, string>());

export { GenresContext };
