import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import fetchDetailData from '../api/fetchDataCard';
import fetchData from '../api/fetchData';
import MainContent from '../components/MainContent/MainContent';
import { IFetchResponse } from '../api/types';
import { IDetailFetch } from '../components/DetailContent/types';

interface DetailPageProps {
  data: IFetchResponse | null;
  dataCard: IDetailFetch | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;

  const dataCard = await fetchDetailData(id);
  const data = await fetchData(context);

  return { props: { dataCard, data } };
};

const DetailPage: React.FC<DetailPageProps> = ({ dataCard, data }) => {
  return <MainContent dataCard={dataCard} data={data} />;
};

export default DetailPage;
