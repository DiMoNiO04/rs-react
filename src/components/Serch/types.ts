interface ISearchProps {
  searchParam: string | undefined;
  handleSearch: (searchQuery: string) => void;
  isLoading: boolean;
}

export type { ISearchProps };
