import { render, screen } from '@testing-library/react';
import { reviewsMocks } from '../../../mocks';
import ReviewCard from './review-card';

describe('Component: ReviewCard', () => {
  it('Should display card correctly', () => {
    const mockReview = reviewsMocks[0];
    render(<ReviewCard item={mockReview} />);

    const advantage = screen.getByText('Mock 1 advantage');
    const disadvantage = screen.getByText('Mock 1 disadvantage');

    expect(advantage).toBeInTheDocument();
    expect(disadvantage).toBeInTheDocument();
  });
});
