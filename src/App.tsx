import { Component } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import Search from './components/Searh';

interface IAppState {
  cards: ICardProps[];
}

class App extends Component<IAppState> {
  state: IAppState = {
    cards: [],
  };

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData(): void {
    const url: string = 'https://swapi.dev/api/people/';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cards: data.results,
        });
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }

  render() {
    return (
      <>
        <Search />
        <ResultsBlock cards={this.state.cards} />
      </>
    );
  }
}

export default App;
