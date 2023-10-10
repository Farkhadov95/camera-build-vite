import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Reviews from './product-reviews';
import { NameSpace } from '../../../const';
import { reviewsMocks } from '../../../mocks';

const mockStore = configureMockStore();

describe('Component: Reviews', () => {
  it('should show "loading..." when isReviewLoading is True', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: [],
        areReviewsLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );

    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should show reviews when isReviewLoading is False', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: reviewsMocks,
        areReviewsLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );

    const displayedReviews = screen.getAllByText('Mock User');
    expect(displayedReviews).toHaveLength(3);
  });

  it('should show reviews when isReviewLoading is False', () => {
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: reviewsMocks,
        areReviewsLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Показать больше отзывов/i));
    const displayedReviews = screen.getAllByText('Mock User');
    expect(displayedReviews).toHaveLength(5);
  });
});
