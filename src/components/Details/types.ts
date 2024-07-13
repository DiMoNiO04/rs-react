enum EDetailesData {
  NAME = 'Name: ',
  HEIGHT = 'Height: ',
  MASS = 'Mass: ',
  BIRTH_YEAR = 'Birth Year: ',
  GENDER = 'Gender: ',
  EYE_COLOR = 'Eye color: ',
  HAIR_COLOR = 'Hair color: ',
  FILMS = 'Films: ',
}

interface IDetailsFetch {
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
  title: EDetailesData;
  value: string | IFilmProps[];
}

interface IDetailsProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export { EDetailesData };
export type { IDetailsProps, IDataCard, IDetailsFetch, IFilmProps };
