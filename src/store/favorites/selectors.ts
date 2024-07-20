import { RootState } from '../store';

export const selectFavoriteCard = (url: string) => (state: RootState) =>
  state.favorites.items.some((item) => item.url === url);
