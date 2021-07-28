import { render, screen } from '@testing-library/react';
import Loading from './Loading';

test('renders loading', () => {
  render(<Loading />);
  const loadingElement = screen.getByTestId('loading');
  expect(loadingElement).toBeInTheDocument();
});
