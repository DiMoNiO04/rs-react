import { Component } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import Search from './components/Searh';
import { API_URL } from './utils/consts';
import { getStorageValue } from './utils/localeStorage';

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

  getFetchUrl(searchParams: string | undefined): string {
    let url: string = API_URL;

    if (getStorageValue()) {
      url += `?search=${getStorageValue()}`;
    } else if (searchParams) {
      url += `?search=${searchParams.trim()}`;
    }

    return url;
  }

  fetchData(searchParams?: string): void {
    fetch(this.getFetchUrl(searchParams))
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
