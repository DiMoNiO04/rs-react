interface IFavoriteItem {
  url: string;
}

interface IFavoritesSliceState {
  items: IFavoriteItem[];
}

export type { IFavoriteItem, IFavoritesSliceState };
