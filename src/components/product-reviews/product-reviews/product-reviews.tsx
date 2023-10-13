import { useState } from 'react';
import {} from '../../../store/selectors/catalog-selectors';
import { useAppSelector } from '../../../hooks';
import ReviewCard from '../review-card/review-card';
import ReviewForm from '../product-form/review-form';
import {
  areReviewsLoading,
  reviews,
} from '../../../store/selectors/reviews-selectors';

const REVIEWS_DISPLAY_STEP = 3;

const Reviews = () => {
  const reviewsAvailable = useAppSelector(reviews);
  const isReviewLoading = useAppSelector(areReviewsLoading);
  const [reviewsToShow, setReviewsToShow] = useState(REVIEWS_DISPLAY_STEP);
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleShowMore = () => {
    setReviewsToShow(reviewsToShow + REVIEWS_DISPLAY_STEP);
  };

  const reviewsCount = reviewsAvailable.length;
  const showForm = () => setFormVisibility(true);
  const hideForm = () => setFormVisibility(false);

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={showForm}>
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {isReviewLoading ? (
              <p>Loading...</p>
            ) : (
              reviewsAvailable
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
      {isFormVisible && <ReviewForm handleClose={hideForm} />}
    </>
  );
};

export default Reviews;
