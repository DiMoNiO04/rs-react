import { IDetailFetch } from '../components/DetailContent/types';
import { API_URL } from '../utils/consts';

async function fetchDetailData(id: string): Promise<IDetailFetch | null> {
  let dataCard: IDetailFetch | null = null;

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
