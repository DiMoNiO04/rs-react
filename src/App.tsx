import { Component } from 'react';
import Search from './components/Searh';
import ResultsBlock from './components/ResultsBlock';

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
