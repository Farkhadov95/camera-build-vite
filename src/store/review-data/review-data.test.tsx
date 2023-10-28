import { reviewData, setSuccessStatus } from './review-data';

describe('Reducer: ReviewData', () => {
  it('should set success status', () => {
    const state = {
      reviews: [],
      areReviewsLoading: false,
      isReviewUploading: false,
      isPostReviewSuccess: false,
      reviewsError: null,
    };

    const action = setSuccessStatus(true);
    const newState = reviewData.reducer(state, action);
    expect(newState).toEqual({
      ...state,
      isPostReviewSuccess: true,
    });
  });
});
