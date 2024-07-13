interface IPaginationProps {
  count: number | undefined;
  currentPage: number;
  onChangePage: (val: number) => void;
}

export type { IPaginationProps };
