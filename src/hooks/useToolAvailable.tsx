import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * Whether the tool is available or not
 */
const useToolAvailable = () => {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!chrome?.storage?.local || loading) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chrome.storage.local.set({ available });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [available]);

  useEffect(() => {
    if (!chrome?.storage?.local) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    chrome.storage.local.get(['available']).then((result) => {
      flushSync(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setAvailable(result.available || false);
      });
      setLoading(false);
    });
  }, []);

  return { available, setAvailable, loading };
};

export default useToolAvailable;
