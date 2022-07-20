import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  favorites: { favoritesItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FAVORITES_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.favorites.favoritesItems.find(
        (item) => item.slug === newItem.slug
      );
      const favoritesItems = existItem
        ? state.favorites.favoritesItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.favorites.favoritesItems, newItem];
      return { ...state, favorites: { ...state.favorites, favoritesItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
