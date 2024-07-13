import { ICardProps } from '../components/Card/types';

interface IGetFetch {
  searchParam?: string;
  pageParam?: number;
}

interface IFetchResponse {
  data: {
    count: number;
    results: ICardProps[];
  };
  stringParams: string;
}

interface IGetFetchReturn {
  url: string;
  stringParams: string;
}

export type { IGetFetch, IFetchResponse, IGetFetchReturn };
