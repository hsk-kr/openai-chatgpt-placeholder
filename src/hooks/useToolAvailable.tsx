import { useContext } from 'react';
import { GlobalContext } from '../contexts/globalContext';

/**
 * Whether the tool is available or not
 */
const useToolAvailable = () => {
  const { available, setAvailable, loading } = useContext(GlobalContext);

  return { available, setAvailable, loading };
};

export default useToolAvailable;
