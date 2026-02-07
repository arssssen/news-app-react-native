import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

import { hydrateFavorites } from '../../features/toggle-favorite/model/favoritesSlice';
import { store } from '../store';

export function StoreProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    void store.dispatch(hydrateFavorites());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
