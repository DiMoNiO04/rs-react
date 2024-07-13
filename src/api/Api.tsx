import { API_URL, FIRST_PAGE } from '../utils/consts';
import { getStorageValue } from '../utils/localeStorage';
import { ETextError } from '../errors/types';
import { IFetchResponse, IGetFetch, IGetFetchReturn } from './types';

class Api {
  static getFetchUrl({ searchParam, pageParam }: IGetFetch): IGetFetchReturn {
    let url: string = API_URL;

    const storageValue = getStorageValue();
    const params = new URLSearchParams();

    if (storageValue) {
      params.append('search', storageValue);
    } else if (searchParam) {
      params.append('search', searchParam.trim());
    }

    if (pageParam !== FIRST_PAGE) {
      params.append('page', String(pageParam));
    }

    const stringParams: string = params.toString();

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
}

export default Api;
