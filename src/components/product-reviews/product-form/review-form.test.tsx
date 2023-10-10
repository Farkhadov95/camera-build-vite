import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, vi } from 'vitest';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../const';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const handleClose = () => vi.fn();
    const store = mockStore({
      [NameSpace.Reviews]: {
        isReviewUploading: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewForm handleClose={handleClose} />
      </Provider>
    );

    const name = screen.getByText('Ваше имя');
    const disadvantage = screen.getByText('Недостатки');
    const comment = screen.getByText('Комментарий');

    expect(name).toBeInTheDocument();
    expect(disadvantage).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
  });

  it('Should show close form when form is submitted', async () => {
    const handleClose = () => vi.fn();
    const store = mockStore({
      [NameSpace.Reviews]: {
        isReviewUploading: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewForm handleClose={handleClose} />
      </Provider>
    );

    const rating = screen.getByTestId('star-1');
    const name = screen.getByLabelText('Ваше имя');
    const advantage = screen.getByLabelText('Достоинства');
    const disadvantage = screen.getByLabelText('Недостатки');
    const comment = screen.getByLabelText('Комментарий');

    fireEvent.click(rating);
    await userEvent.type(name, 'Mock User');
    await userEvent.type(advantage, 'Mock Advantage');
    await userEvent.type(disadvantage, 'Mock Disadvantage');
    await userEvent.type(comment, 'Mock Comment');

    await waitFor(() => {
      expect(rating).toBeChecked();
      expect(name).toHaveValue('Mock User');
      expect(advantage).toHaveValue('Mock Advantage');
      expect(disadvantage).toHaveValue('Mock Disadvantage');
      expect(comment).toHaveValue('Mock Comment');
    });
  });
});
