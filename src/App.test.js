import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the student introduction', () => {
  render(<App />);
  const headingElement = screen.getByText(/hi, i am riya/i);
  expect(headingElement).toBeInTheDocument();
});
