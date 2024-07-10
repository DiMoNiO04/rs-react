import { Component, ReactNode } from 'react';

export interface ICardProps {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

interface IDataCard {
  title: string;
  value: string;
}

class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render(): ReactNode {
    const { name, height, mass, birth_year, gender } = this.props;

    const dataCard: IDataCard[] = [
      {
        title: 'Name:',
        value: name,
      },
      {
        title: 'Height:',
        value: height,
      },
      {
        title: 'Mass:',
        value: mass,
      },
      {
        title: 'Birth Year:',
        value: birth_year,
      },
      {
        title: 'Gender:',
        value: gender,
      },
    ];

    return (
      <li className="card">
        {dataCard.map((item, index) => (
          <div className="card__block" key={index}>
            <b>{item.title}</b>
            <p>{item.value}</p>
          </div>
        ))}
      </li>
    );
  }
}

export default Card;
