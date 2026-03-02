import { useContext } from 'react';
import posterContext from './posterContext';

const usePosterContext = () => {
  const result = useContext(posterContext);

  return result;
};

export default usePosterContext;
