import { ICardProps } from '../components/Card/types';

interface IGetFetch {
  searchParams?: string;
  pageParams?: number;
}

interface IFetchResponse {
  count: number;
  results: ICardProps[];
}

export type { IGetFetch, IFetchResponse };
