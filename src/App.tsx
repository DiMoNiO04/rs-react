import { Component } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import Search from './components/Searh';

interface IAppState {
  cards: ICardProps[];
  searchParams: string;
}

class App extends Component<object, IAppState> {
  constructor(props: IAppState) {
    super(props);
    this.state = {
      cards: [],
      searchParams: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData(searchParams?: string): void {
    const url: string = searchParams
      ? `https://swapi.dev/api/people/?search=${searchParams}`
      : 'https://swapi.dev/api/people/';

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

  handleSearch(searchParams: string): void {
    this.setState({ searchParams });
    this.fetchData(searchParams);
  }

  render() {
    return (
      <>
        <Search searchParams={this.state.searchParams} handleSearch={this.handleSearch} />
        <ResultsBlock cards={this.state.cards} />
      </>
    );
  }
}

export default App;
