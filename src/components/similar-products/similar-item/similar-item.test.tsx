import { render, screen } from '@testing-library/react';
import SimilarItem from './similar-item';
import { catalogItemMock } from '../../../mocks';
import { MemoryRouter } from 'react-router-dom';

describe('Component: SimilarItem', () => {
  it('Should be rendered correctly', () => {
    render(
      <MemoryRouter initialEntries={['/catalog']}>
        <SimilarItem item={catalogItemMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
