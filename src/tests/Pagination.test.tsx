import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

const COUNT = 24;
const ceilFunc = () => Math.ceil(COUNT / 10);

describe('Pagination component', () => {
  it('should render correct count and current page', () => {
    const currentPage = 2;

    render(<Pagination count={COUNT} currentPage={currentPage} onChangePage={() => {}} />);
    expect(screen.getByText(currentPage)).toBeInTheDocument();
    expect(screen.getByText(ceilFunc())).toBeInTheDocument();
  });

  it('should disable prev btn when current page === first page', () => {
    const currentPage = 1;

    render(<Pagination count={COUNT} currentPage={currentPage} onChangePage={() => {}} />);
    const prevBtn = screen.getByTestId('btn-prev');
    expect(prevBtn).toBeDisabled();
  });

  it('should disable next btn when current page === last page', () => {
    const currentPage = ceilFunc();

    render(<Pagination count={COUNT} currentPage={currentPage} onChangePage={() => {}} />);
    const nextBtn = screen.getByTestId('btn-next');
    expect(nextBtn).toBeDisabled();
  });
});
