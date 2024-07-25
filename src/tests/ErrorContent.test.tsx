import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorContent from '../components/ErrorContent/ErrorContent';
import { ETextError } from '../errors/types';

describe('ErrorContent Component', () => {
  it('should render component', () => {
    render(<ErrorContent />);
    expect(screen.getByText(ETextError.UI_ERR));
  });
});
