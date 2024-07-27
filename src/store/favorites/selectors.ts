import { ICardProps } from '../../components/Card/types';
import { RootState } from '../store';

export const selectFavoriteCard = (url: string) => (state: RootState) =>
  state.favorites.items.some((item: ICardProps) => item.url === url);

export const selectCount = () => (state: RootState) => state.favorites.items.length;

export const selectAllFavoriteCards = () => (state: RootState) => state.favorites.items;
