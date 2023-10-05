import { Reviews } from '../../type/reviews';
import { NameSpace } from '../../const';
import { State } from '../../type/state';

export const reviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const areReviewsLoading = (state: State): boolean => state[NameSpace.Reviews].areReviewsLoading;
export const isReviewUploading = (state: State): boolean => state[NameSpace.Reviews].isReviewUploading;
export const isPostReviewSuccess = (state: State): boolean => state[NameSpace.Reviews].isPostReviewSuccess;
