import { Component } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import Search from './components/Searh';
import { API_URL } from './utils/consts';
import { getStorageValue } from './utils/localeStorage';

interface IAppState {
  cards: ICardProps[];
  searchParams: string;
  isLoading: boolean;
}

class App extends Component<object, IAppState> {
  constructor(props: IAppState) {
    super(props);
    this.state = {
      cards: [],
      searchParams: '',
      isLoading: false,
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
    this.setState({ isLoading: true });

    const url: string = this.getFetchUrl(searchParams);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cards: data.results,
          isLoading: false,
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
    const { cards, isLoading, searchParams } = this.state;

    return (
      <>
        <Search searchParams={searchParams} handleSearch={this.handleSearch} isLoading={isLoading} />
        <ResultsBlock cards={cards} isLoading={isLoading} />
      </>
    );
  }
}

export default App;
