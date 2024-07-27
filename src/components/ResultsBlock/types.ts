import { ICardProps } from '../Card/types';

interface IResultBlockProps {
  cards: ICardProps[];
  isFetching: boolean;
  searchValue: string;
}

export type { IResultBlockProps };
