import { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
      <div className="pagination">
        <div className="pagination__title">
          <div className="pagination__title-page">Page:</div>
          <div className="pagination__title-numbers">
            <span>1</span>
            <span>/</span>
            <span>5</span>
          </div>
        </div>
        <div className="pagination__btns">
          <button type="button" className="pagination__btn">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 19L9 12L16 5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="pagination__btn">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19L16 12L9 5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default Pagination;
