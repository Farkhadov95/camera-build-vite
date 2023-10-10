import { screen, render } from '@testing-library/react';
import ReviewSuccess from './review-success';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

describe('Component: ReviewSuccess', () => {
  it('Should be rendered correctly', () => {
    const mockStore = configureMockStore();
    render(
      <Provider store={mockStore({})}>
        <ReviewSuccess />
      </Provider>
    );

    const title = screen.getByText('Спасибо за отзыв');
    expect(title).toBeInTheDocument();
  });
});
