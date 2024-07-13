import { ICardProps } from '../Card/types';

interface IResultBlockProps {
  cards: ICardProps[];
  isLoading: boolean;
  searchValue: string;
  handleClickCard: (val: number) => void;
}

export type { IResultBlockProps };
