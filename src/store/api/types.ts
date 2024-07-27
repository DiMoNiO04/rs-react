import { ICardProps } from '../../components/Card/types';

interface IGetFetch {
  searchParam?: string;
  pageParam?: number;
}

interface IFetchResponse {
  count: number;
  results: ICardProps[];
}

interface IGetFetchReturn {
  url: string;
  stringParams: string;
}

export type { IGetFetch, IFetchResponse, IGetFetchReturn };
