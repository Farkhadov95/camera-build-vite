import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { MemoryRouter } from 'react-router-dom';

describe('Page: NotFound', () => {
  it('Render correctly', () => {
    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404. Page is not found/i)).toBeInTheDocument();
  });
});
