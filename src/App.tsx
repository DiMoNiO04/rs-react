import { Component, ReactNode } from 'react';
import ResultsBlock from './components/ResultsBlock';
import { ICardProps } from './components/Card';
import Search from './components/Searh';
import ErrorContent from './components/ErrorContent';
import Api from './components/Api';

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

  async fetchData(searchParams?: string): Promise<void> {
    this.setState({ isLoading: true });

    try {
      const cards = await Api.fetchData(searchParams);
      this.setState({ cards: cards });
    } catch (err) {
      console.error(`Error fetch data ${err}`);
      throw err;
    } finally {
      this.setState({
        isLoading: false,
      });
    }
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
