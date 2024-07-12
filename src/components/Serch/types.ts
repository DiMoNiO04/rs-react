interface ISearchProps {
  searchParams: string;
  handleSearch: (searchQuery: string) => void;
  isLoading: boolean;
}

export type { ISearchProps };
