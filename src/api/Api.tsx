import { API_URL, FIRST_PAGE } from '../utils/consts';
import { ETextError } from '../errors/types';
import { IFetchResponse, IGetFetch, IGetFetchReturn } from './types';
import { IDetailsFetch, IFilmProps } from '../pages/Details/types';

class Api {
  static getFetchUrl({ searchParam, pageParam }: IGetFetch): IGetFetchReturn {
    const params = new URLSearchParams();

    if (searchParam) {
      params.append('search', searchParam.trim());
    }
    if (pageParam !== FIRST_PAGE) {
      params.append('page', String(pageParam));
    }
    const stringParams: string = params.toString();

    let url: string = API_URL;
    if (stringParams) {
      url += `?${stringParams}`;
    }

    return { url, stringParams };
  }

  static async fetchData({ searchParam, pageParam }: IGetFetch): Promise<IFetchResponse> {
    const { url, stringParams }: IGetFetchReturn = this.getFetchUrl({ searchParam, pageParam });

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { data, stringParams };
    } else {
      throw new Error(ETextError.NETWORK_ERR);
    }
  }

  static async fetchDataPerson(id: string): Promise<IDetailsFetch> {
    const url: string = `${API_URL}${id}/`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(ETextError.NETWORK_ERR);
    }
  }

  static async fetchDataFilm(url: string): Promise<IFilmProps> {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(ETextError.NETWORK_ERR);
    }
  }
}

export default Api;
