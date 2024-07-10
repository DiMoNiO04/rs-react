import { Component, ReactNode } from 'react';

class ErrorContent extends Component {
  render(): ReactNode {
    return (
      <div className="container">
        <div className="results__error-msg">
          <h2>Oooops. An unexpected error occurred. Restart the application!</h2>
        </div>
      </div>
    );
  }
}

export default ErrorContent;
