import { ChangeEvent, Component } from 'react';

interface ISearchProps {
  searchParams: string;
  handleSearch: (searchQuery: string) => void;
}

interface ISearchState {
  inputValue: string;
}

class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      inputValue: props.searchParams || '',
    };

    this.changeInputValue = this.changeInputValue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  state: ISearchState = {
    inputValue: this.props.searchParams || '',
  };

  changeInputValue(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value });
  }

  handleSearch(): void {
    this.props.handleSearch(this.state.inputValue.trim());
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Поиск персонажей Star Wars</h1>
          <div className="search">
            <div className="search__block">
              <input
                type="text"
                placeholder="Поиск персонажей"
                value={this.state.inputValue}
                onChange={(event) => this.changeInputValue(event)}
              />
              <button type="button" onClick={this.handleSearch}>
                Поиск
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
