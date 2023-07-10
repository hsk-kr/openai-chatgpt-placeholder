import { useContext } from 'react';
import { GlobalContext } from '../contexts/globalContext';

const usePlaceholderList = () => {
  const {
    placeholderList,
    setPlaceholderList,
    addNewPlaceholderListItem,
    removePlaceholderListItem,
    togglePlaceholderListItemActive,
    loading,
  } = useContext(GlobalContext);

  return {
    placeholderList,
    setPlaceholderList,
    addNewPlaceholderListItem,
    removePlaceholderListItem,
    togglePlaceholderListItemActive,
    loading,
  };
};

export default usePlaceholderList;
