import { API_URL } from '../utils/consts';
import { getStorageValue } from '../utils/localeStorage';
import { ICardProps } from './Card/types';

class Api {
  static getFetchUrl(searchParams: string | undefined): string {
    let url: string = API_URL;

    if (getStorageValue()) {
      url += `?search=${getStorageValue()}`;
    } else if (searchParams) {
      url += `?search=${searchParams.trim()}`;
    }

    return url;
  }

  static async fetchData(searchParams: string | undefined): Promise<ICardProps[]> {
    const url: string = this.getFetchUrl(searchParams);

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.results as ICardProps[];
    } else {
      throw new Error('Network not ok');
    }
  }
}

export default Api;
