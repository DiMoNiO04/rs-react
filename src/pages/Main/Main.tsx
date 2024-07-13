import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICardProps } from '../../components/Card/types';
import { IGetFetch } from '../../api/types';
import Api from '../../api/Api';
import { ETextError } from '../../errors/types';
import ResultsBlock from '../../components/ResultsBlock/ResultsBlock';
import Pagination from '../../components/Pagination/Pagination';
import { EMPTY_STR, FIRST_PAGE } from '../../utils/consts';
import useLocaleStorage, { ELocaleKeys } from '../../hooks/useLocaleStorage';
import Details from '../../components/Details/Details';
import Search from '../../components/Serch/Searh';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<ICardProps[]>([]);
  const [count, setCount] = useState<number>();
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  const [searchParam, setSearchParam] = useLocaleStorage(ELocaleKeys.SEARCH, EMPTY_STR);
  const [pageParam, setPageParam] = useLocaleStorage(ELocaleKeys.PAGE, FIRST_PAGE);
  const [detailsParam, setDetailsParam] = useLocaleStorage(ELocaleKeys.DETAILS, EMPTY_STR);

  useEffect(() => {
    if (detailsParam) {
      setIsOpenDetails(true);
    }
  }, []);

  useEffect(() => {
    fetchData({ searchParam, pageParam });
  }, [searchParam, pageParam]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchParam) params.append('search', searchParam);
    if (pageParam && pageParam !== FIRST_PAGE) params.append('page', pageParam.toString());
    if (detailsParam) params.append('details', detailsParam.toString());

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchParam, pageParam, detailsParam]);

  const fetchData = async ({ searchParam, pageParam }: IGetFetch): Promise<void> => {
    setIsLoading(true);

    try {
      const { data } = await Api.fetchData({ searchParam, pageParam });
      setCards(data.results);
      setCount(data.count);
    } catch (err) {
      console.error(`${ETextError.FETCH_ERR} ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchParam: string): void => {
    setSearchParam(searchParam);
    setPageParam(FIRST_PAGE);
  };

  const handleChangePage = (page: number): void => {
    setPageParam(page);
  };

  const handleClickCard = (id: number): void => {
    setDetailsParam(id);
    setIsOpenDetails(true);
  };

  const handleCloseDetails = (): void => {
    setIsOpenDetails(false);
    setDetailsParam(EMPTY_STR);
  };

  return (
    <>
      <Search searchParam={searchParam} handleSearch={handleSearch} isLoading={isLoading} />
      <ResultsBlock cards={cards} isLoading={isLoading} searchValue={searchParam} handleClickCard={handleClickCard} />
      {!isLoading && count && <Pagination count={count} currentPage={pageParam} onChangePage={handleChangePage} />}
      {isOpenDetails && <Details isOpen={isOpenDetails} onClose={handleCloseDetails} />}
    </>
  );
};

export default Main;
