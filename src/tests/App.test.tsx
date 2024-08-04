import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../app/page';
import { ETheme } from '../context/themeContext';

describe('App Component', () => {
  it('renders the not found page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    window.history.pushState({}, 'Not Found', '/unknown');
    fireEvent.popState(window);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('toggles the theme', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /theme/i });
    expect(document.body.classList.contains(ETheme.DARK)).toBe(false);

    fireEvent.click(button);
    expect(store.getState().theme.value).toBe(ETheme.DARK);
    expect(document.body.classList.contains(ETheme.DARK)).toBe(true);

    fireEvent.click(button);
    expect(store.getState().theme.value).toBe(ETheme.LIGHT);
    expect(document.body.classList.contains(ETheme.DARK)).toBe(false);
  });
});
