import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <li className="card">
        <div className="card__block">
          <b>Name:</b>
          <p>Luke Skywalker</p>
        </div>
        <div className="card__block">
          <b>Height:</b>
          <p>172</p>
        </div>
        <div className="card__block">
          <b>Mass:</b>
          <p>77</p>
        </div>
        <div className="card__block">
          <b>Birth Year:</b>
          <p>19BBY</p>
        </div>
        <div className="card__block">
          <b>Gender:</b>
          <p>Male</p>
        </div>
      </li>
    );
  }
}

export default Card;
