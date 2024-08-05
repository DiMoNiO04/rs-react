enum EDetailData {
  NAME = 'Name: ',
  HEIGHT = 'Height: ',
  MASS = 'Mass: ',
  BIRTH_YEAR = 'Birth Year: ',
  GENDER = 'Gender: ',
  EYE_COLOR = 'Eye color: ',
  HAIR_COLOR = 'Hair color: ',
}

interface IDetailFetch {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
}

interface IDataCard {
  title: EDetailData;
}

interface IDetailProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export { EDetailData };
export type { IDetailFetch, IDataCard, IDetailProps };
