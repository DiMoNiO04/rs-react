import { Component } from 'react';
import Search from './components/search/Searh';
import ResultsBlock from './components/resultsBlock/ResultsBlock';

class App extends Component {
  render() {
    return (
      <>
        <Search />
        <ResultsBlock />
      </>
    );
  }
}

export default App;
