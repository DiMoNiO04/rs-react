import { Component, ReactNode } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import { API_URL } from './utils/consts';
import { getStorageValue } from './utils/localeStorage';
import Search from './components/Searh';
import ErrorContent from './components/ErrorContent';

interface IAppState {
  cards: ICardProps[];
  searchParams: string;
  isLoading: boolean;
  isError: boolean;
}

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      searchParams: '',
      isLoading: false,
      isError: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.throwError = this.throwError.bind(this);
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
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
        });
        console.error('Error fetching data', error);
        throw error;
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  handleSearch(searchParams: string): void {
    this.setState({ searchParams });
    this.fetchData(searchParams);
  }

  throwError(): void {
    let counter = 1;
    this.setState(() => {
      console.log('this is count of error', counter);
      counter += 1;
      throw new Error('Triggered Error');
    });
  }

  render(): ReactNode {
    const { cards, isLoading, searchParams, isError } = this.state;

    return (
      <>
        {isError ? (
          <ErrorContent />
        ) : (
          <>
            <Search searchParams={searchParams} handleSearch={this.handleSearch} isLoading={isLoading} />
            <ResultsBlock cards={cards} isLoading={isLoading} />
            <section className="section">
              <div className="container">
                <button className="results__error-btn" onClick={this.throwError}>
                  Trigger Error
                </button>
              </div>
            </section>
          </>
        )}
      </>
    );
  }
}

export default App;
