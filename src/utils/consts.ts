export const STORAGE_KEY: string = 'searchParams';
export const API_URL: string = 'https://swapi.dev/api/people/';

export enum ETextError {
  CAUGHT_ERR = 'ErrorBoundary caught an error',
  UI_ERR = 'Oooops. An unexpected error occurred. Restart the application!',
  FETCH_ERR = 'Error fetch data',
  TRIGGER_ERR = 'Triggered Error',
}
