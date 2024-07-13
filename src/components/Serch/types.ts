interface ISearchProps {
  searchParams: string | undefined;
  handleSearch: (searchQuery: string) => void;
  isLoading: boolean;
}

export type { ISearchProps };
