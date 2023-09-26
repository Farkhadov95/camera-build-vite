import { useState } from 'react';
import {
  isReviewLoadingSelector,
  reviewsSelector,
} from '../../store/selectors/catalog-selectors';
import { useAppSelector } from '../../hooks';
import ReviewCard from './review-card';
import ReviewForm from './review-form';

const REVIEWS_DISPLAY_STEP = 3;

const Reviews = () => {
  const reviews = useAppSelector(reviewsSelector);
  const isReviewLoading = useAppSelector(isReviewLoadingSelector);
  const [reviewsToShow, setReviewsToShow] = useState(REVIEWS_DISPLAY_STEP);
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleShowMore = () => {
    setReviewsToShow(reviewsToShow + REVIEWS_DISPLAY_STEP);
  };

  const reviewsCount = reviews.length;

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={() => setFormVisibility(true)}
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {isReviewLoading ? (
              <p>Loading...</p>
            ) : (
              reviews
                .slice(0, reviewsToShow)
                .map((review) => <ReviewCard key={review.id} item={review} />)
            )}
          </ul>
          <div className="review-block__buttons">
            {reviewsCount > reviewsToShow && (
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleShowMore}
              >
                Показать больше отзывов
              </button>
            )}
          </div>
        </div>
      </section>
      {isFormVisible && (
        <ReviewForm handleClose={() => setFormVisibility(false)} />
      )}
    </>
  );
};

export default Reviews;
