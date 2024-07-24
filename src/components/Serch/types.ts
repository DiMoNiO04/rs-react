interface ISearchProps {
  searchParam: string;
  handleSearch: (searchQuery: string) => void;
  isLoading: boolean;
}

export type { ISearchProps };
