import { ChangeEvent, Component } from 'react';
import { STORAGE_KEY } from '../utils/consts';
import { getStorageValue } from '../utils/localeStorage';

interface ISearchProps {
  searchParams: string;
  handleSearch: (searchQuery: string) => void;
  isLoading: boolean;
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

  componentDidMount(): void {
    const storageValue: string | null = getStorageValue();
    if (storageValue !== null) {
      this.setState({
        inputValue: storageValue,
      });
    }
  }

  changeInputValue(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value });
  }

  handleSearch(): void {
    this.setState({ inputValue: this.state.inputValue.trim() }, () => {
      localStorage.setItem(STORAGE_KEY, this.state.inputValue);
      this.props.handleSearch(this.state.inputValue);
    });
  }

  render() {
    const { isLoading } = this.props;

    return (
      <section className="section">
        <div className="container">
          <h1>Search peoples for Star Wars</h1>
          <div className="search">
            <div className="search__block">
              <input
                type="text"
                placeholder="Search peoples"
                value={this.state.inputValue}
                onChange={(event) => this.changeInputValue(event)}
              />
              <button disabled={isLoading} type="button" onClick={this.handleSearch}>
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
