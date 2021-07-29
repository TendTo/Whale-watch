import { render, screen } from '@testing-library/react';
import App from './App';

test('App renders', () => {
  render( <App />);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
