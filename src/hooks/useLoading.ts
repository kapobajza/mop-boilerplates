import { useEffect, useRef, useState } from 'react';

import { ActionHandler } from './types';

// Hook used to initiate loading on action started and finish loading on action completed
const useLoading = (action: ActionHandler, timeout = 0): [ActionHandler, boolean] => {
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const doAction: ActionHandler = (...args: any[]) => {
    setLoading(true);

    return action(...args).finally(() => {
      setTimeout(() => {
        // Call setLoading only if the component is mounted, otherwise we'll get a memory leak
        if (isMounted.current) {
          setLoading(false);
        }
      }, timeout); // Set a short timeout, which is needed when the component needs to unmount succesfully
    });
  };

  return [doAction, loading];
};

export default useLoading;
