import { API_URL } from '../utils/consts';
import { IFetchResponse } from './types';

async function fetchDetailData(id: string): Promise<IFetchResponse | null> {
  let dataCard: IFetchResponse | null = null;

  try {
    const dataCardRes = await fetch(`${API_URL}/${id}`);
    if (dataCardRes.ok) {
      dataCard = await dataCardRes.json();
    } else {
      console.error('Failed to fetch data card');
    }
  } catch (e) {
    console.error('Error fetching data card', e);
  }

  return dataCard;
}

export default fetchDetailData;
