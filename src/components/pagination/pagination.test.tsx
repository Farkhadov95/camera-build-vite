import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly the 1st page', () => {
    const handlePageChange = vi.fn();
    const { getByText, getAllByRole } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePageChange={handlePageChange}
      />
    );

    const pageItems = getAllByRole('listitem');
    expect(pageItems).toHaveLength(4);

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('Далее')).toBeInTheDocument();
  });

  it('should render correctly the 3rd page', () => {
    const handlePageChange = vi.fn();
    const { getByText, getAllByRole } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        handlePageChange={handlePageChange}
      />
    );

    const pageItems = getAllByRole('listitem');
    expect(pageItems).toHaveLength(4);

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('Далее')).toBeInTheDocument();
  });
});
