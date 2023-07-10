import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { createContext } from 'react';

type PlaceHolderListItem = {
  id: string;
  title: string;
  placeholder: string;
  active: boolean;
};

interface GlobalContextType {
  placeholderList: PlaceHolderListItem[];
  setPlaceholderList: Dispatch<SetStateAction<PlaceHolderListItem[]>>;
  addNewPlaceholderListItem: VoidFunction;
  removePlaceholderListItem: (id: string) => void;
  togglePlaceholderListItemActive: (id: string, active: boolean) => void;
  loading: boolean;
  available: boolean;
  setAvailable: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [placeholderList, setPlaceholderList] = useState<PlaceHolderListItem[]>(
    []
  );
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!chrome?.storage?.local || loading) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chrome.storage.local.set({
      placeholderList: JSON.stringify(placeholderList),
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chrome.storage.local.set({ available });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholderList]);

  useEffect(() => {
    if (!chrome?.storage?.local) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chrome.storage.local
      .get(['placeholderList', 'available'])
      .then((result) => {
        try {
          flushSync(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setPlaceholderList(JSON.parse(result.placeholderList));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setAvailable(result.available || false);
          });
        } catch (e) {
          flushSync(() => {
            setPlaceholderList([]);
          });
          console.error(e);
        } finally {
          setLoading(false);
        }
      });
  }, []);

  const addNewPlaceholderListItem = useCallback(() => {
    setPlaceholderList((prevPlaceholderList) =>
      prevPlaceholderList.concat({
        id: uuidv4(),
        title: 'New Item',
        placeholder: '',
        active: false,
      })
    );
  }, []);

  const removePlaceholderListItem = useCallback((id: string) => {
    setPlaceholderList((prevPlaceholderList) =>
      prevPlaceholderList.filter((item) => item.id !== id)
    );
  }, []);

  const togglePlaceholderListItemActive = useCallback(
    (id: string, active: boolean) => {
      setPlaceholderList((prevPlaceholderList) =>
        prevPlaceholderList.map((item) => {
          if (item.id === id) {
            item.active = active;
          }

          return item;
        })
      );
    },
    []
  );

  const value = {
    placeholderList,
    setPlaceholderList,
    addNewPlaceholderListItem,
    removePlaceholderListItem,
    togglePlaceholderListItemActive,
    loading,
    available,
    setAvailable,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
