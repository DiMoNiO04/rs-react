import MainContent from '../../../components/MainContent/MainContent';
import { IFetchResponse } from '../../../api/types';
import fetchData from '../../../api/fetchData';
import { EStorageKeys } from '../../../utils/localeStorage';
import { EMPTY_STR, FIRST_PAGE } from '../../../utils/consts';
import { IDetailFetch } from '../../../components/DetailContent/types';
import fetchDetailData from '../../../api/fetchDataCard';
import { Metadata } from 'next';

interface IPageProps {
  searchParams: { [key: string]: string | undefined };
  params: { id: string };
}

export const metadata: Metadata = {
  title: 'Card | Star Wars Search',
  description: 'Card | Star Wars Search description',
};

const DetailPage = async ({ searchParams, params }: IPageProps) => {
  const { id } = params;

  const searchParam = searchParams[EStorageKeys.SEARCH] || EMPTY_STR;
  const pageParam = searchParams[EStorageKeys.PAGE] || FIRST_PAGE;

  const fetchDataWrapper = async () => {
    try {
      return await fetchData(searchParam, Number(pageParam));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const fetchDataCardWrapper = async () => {
    try {
      return await fetchDetailData(id);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const data: IFetchResponse | null = await fetchDataWrapper();
  const dataCard: IDetailFetch | null = await fetchDataCardWrapper();

  return <MainContent data={data} dataCard={dataCard} />;
};

export default DetailPage;
