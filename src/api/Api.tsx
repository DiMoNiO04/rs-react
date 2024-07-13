import { API_URL } from '../utils/consts';
import { getStorageValue } from '../utils/localeStorage';
import { ETextError } from '../errors/types';
import { IFetchResponse, IGetFetch } from './types';

class Api {
  static getFetchUrl({ searchParams, pageParams }: IGetFetch): string {
    let url: string = API_URL;

    const storageValue = getStorageValue();
    const params = new URLSearchParams();

    if (storageValue) {
      params.append('search', storageValue);
    } else if (searchParams) {
      params.append('search', searchParams.trim());
    }

    if (pageParams !== 1) {
      params.append('page', String(pageParams));
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return url;
  }

  static async fetchData({ searchParams, pageParams }: IGetFetch): Promise<IFetchResponse> {
    const url: string = this.getFetchUrl({ searchParams, pageParams });

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
