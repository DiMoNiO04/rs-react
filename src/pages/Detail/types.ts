enum EDetailData {
  NAME = 'Name: ',
  HEIGHT = 'Height: ',
  MASS = 'Mass: ',
  BIRTH_YEAR = 'Birth Year: ',
  GENDER = 'Gender: ',
  EYE_COLOR = 'Eye color: ',
  HAIR_COLOR = 'Hair color: ',
  FILMS = 'Films: ',
}

interface IDetailFetch {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  films: string[];
}

interface IFilmProps {
  title: string;
}

interface IDataCard {
  title: EDetailData;
  value: string | IFilmProps[];
}

interface IDetailProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export { EDetailData };
export type { IDetailProps, IDataCard, IDetailFetch, IFilmProps };
