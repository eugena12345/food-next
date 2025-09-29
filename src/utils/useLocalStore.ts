import { useEffect, useRef } from 'react';

export interface ILocalStore {
  destroy(): void;
}

export const useLocalStore = <S extends ILocalStore>(
  creator: () => S,
  dependencies: React.DependencyList = []
): S => {
  const store = useRef<S | null>(null);
  const outdated = useRef<boolean>(false);

  if (store.current === null || outdated.current) {
    store.current = creator();
    outdated.current = false;
  }

  useEffect(() => {
    if (outdated.current) {
      store.current = creator();
      outdated.current = false;
    }

    return () => {
      store.current?.destroy();
      outdated.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return store.current;
};
