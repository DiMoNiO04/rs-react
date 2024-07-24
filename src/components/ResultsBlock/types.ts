import { ICardProps } from '../Card/types';

interface IResultBlockProps {
  cards: ICardProps[];
  isLoading: boolean;
  searchValue: string;
}

export type { IResultBlockProps };
