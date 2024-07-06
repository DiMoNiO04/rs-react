import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <li className="card">
        <h3>Название</h3>
        <p>Описание</p>
      </li>
    );
  }
}

export default Card;
