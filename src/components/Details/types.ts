enum EDetailesData {
  NAME = 'Name: ',
  Height = 'Height: ',
  MASS = 'Mass: ',
  BIRTH_DAY = 'Birth Year: ',
  GENDER = 'Gender',
  EYE_COLOR = 'Eye color:',
  HAIR_COLOR = 'Hair color: ',
  FILMS = 'Films: ',
}

// interface IDetailsProps {
//   name: string;
//   height: string;
//   mass: string;
//   birth_year: string;
//   gender: string;
//   eyeColor: string;
//   hairColor: string;
//   films: IFilmProps[];
// }

interface IFilmProps {
  title: string;
  director: string;
  producer: string;
}

interface IDataCard {
  title: EDetailesData;
  value: string | IFilmProps;
}

interface IDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

export { EDetailesData };
export type { IDetailsProps, IDataCard };
