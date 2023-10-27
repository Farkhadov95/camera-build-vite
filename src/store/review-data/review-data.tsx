import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostReview, Review, Reviews, ReviewsData } from '../../type/reviews';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../type/state';
import { ErrorMessages, NameSpace } from '../../const';

const initialState: ReviewsData = {
  reviews: [],
  areReviewsLoading: false,
  isReviewUploading: false,
  isPostReviewSuccess: false,
  reviewsError: null,
};

export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  { id: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProductReviews', async ({ id }, { extra: api }) => {
  const { data } = await api.get<Reviews>(`/cameras/${id}/reviews`);
  return data;
});

export const postReviewAction = createAsyncThunk<
  Review,
  { review: PostReview; cameraId: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postReview', async ({ review, cameraId }, { dispatch, extra: api }) => {
  const { data } = await api.post<Review>('/reviews', review);
  dispatch(fetchReviewsAction({ id: cameraId }));
  return data;
});

export const reviewData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setSuccessStatus: (state, action: { payload: boolean }) => {
      state.isPostReviewSuccess = action.payload;
    },
    clearReviewErrors: (state) => {
      state.reviewsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.areReviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.areReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.areReviewsLoading = false;
        state.reviewsError = ErrorMessages.REVIEWS_LOAD;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewUploading = true;
        state.reviewsError = null;
      })
      .addCase(postReviewAction.fulfilled, (state) => {
        state.isReviewUploading = false;
        state.isPostReviewSuccess = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewUploading = false;
        state.reviewsError = ErrorMessages.REVIEW_UPLOAD;
      });
  },
});

export const { setSuccessStatus, clearReviewErrors } = reviewData.actions;
