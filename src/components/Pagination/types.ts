interface IPaginationProps {
  count: number | undefined;
  currentPage: number;
  onChangePage: (val: string) => void;
}

export type { IPaginationProps };
