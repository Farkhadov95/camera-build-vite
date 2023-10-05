export type ReviewsData = {
    reviews: Reviews;
    areReviewsLoading: boolean;
    isReviewUploading: boolean;
    isPostReviewSuccess: boolean;
}

export type Review = {
    id: string;
    createAt: string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}

export type PostReview = {
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}


export type Reviews = Review[];
