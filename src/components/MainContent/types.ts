import { IFetchResponse } from '../../api/types';
import { IDetailFetch } from '../DetailContent/types';

interface IMainContentProps {
  dataCard?: IDetailFetch | null;
  data: IFetchResponse | null;
}

export type { IMainContentProps };
