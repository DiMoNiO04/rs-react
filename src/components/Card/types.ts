enum ECardData {
  NAME = 'Name: ',
  HEIGHT = 'Height: ',
  MASS = 'Mass: ',
  BIRTH_DAY = 'Birth Year: ',
  GENDER = 'Gender',
}

interface ICardProps {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  url: string;
  handleClickCard: (val: number) => void;
}

interface IDataCard {
  title: ECardData;
  value: string;
}

export { ECardData };
export type { ICardProps, IDataCard };
