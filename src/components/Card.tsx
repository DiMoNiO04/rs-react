import { Component } from 'react';

export interface ICardProps {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const { name, height, mass, birth_year, gender } = this.props;

    return (
      <li className="card">
        <div className="card__block">
          <b>Name:</b>
          <p>{name}</p>
        </div>
        <div className="card__block">
          <b>Height:</b>
          <p>{height}</p>
        </div>
        <div className="card__block">
          <b>Mass:</b>
          <p>{mass}</p>
        </div>
        <div className="card__block">
          <b>Birth Year:</b>
          <p>{birth_year}</p>
        </div>
        <div className="card__block">
          <b>Gender:</b>
          <p>{gender}</p>
        </div>
      </li>
    );
  }
}

export default Card;
