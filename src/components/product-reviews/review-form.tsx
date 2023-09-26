import React, { useState } from 'react';
import ReviewStar from './review-star';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/reducers/catalog-data';
import { PostReview } from '../../type/catalog';
import { useParams } from 'react-router-dom';
import { isReviewLoadingSelector } from '../../store/selectors/catalog-selectors';

type Props = {
  handleClose: () => void;
};

const ReviewForm = ({ handleClose }: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isReviewLoading = useAppSelector(isReviewLoadingSelector);
  const [reviewInfo, setReviewInfo] = useState({
    cameraId: Number(id),
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 1,
  });

  const starsValues = [
    {
      count: 5,
      title: 'Отлично',
    },
    {
      count: 4,
      title: 'Хорошо',
    },
    {
      count: 3,
      title: 'Нормально',
    },
    {
      count: 2,
      title: 'Плохо',
    },
    {
      count: 1,
      title: 'Ужасно',
    },
  ];

  const review: PostReview = {
    cameraId: reviewInfo.cameraId,
    userName: reviewInfo.userName,
    advantage: reviewInfo.advantage,
    disadvantage: reviewInfo.disadvantage,
    review: reviewInfo.review,
    rating: reviewInfo.rating,
  };

  const onChangeHandler = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    evt.persist();
    const { name, value } = evt.target;
    setReviewInfo({ ...reviewInfo, [name]: value });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReviewAction({ review, cameraId: Number(id) }));
    if (!isReviewLoading) {
      handleClose();
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {starsValues.map((star) => (
                        <ReviewStar
                          key={star.count}
                          count={star.count}
                          title={star.title}
                        />
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Введите ваше имя"
                      onChange={onChangeHandler}
                      required
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="advantage"
                      placeholder="Основные преимущества товара"
                      onChange={onChangeHandler}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать достоинства
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="disadvantage"
                      placeholder="Главные недостатки товара"
                      onChange={onChangeHandler}
                      required
                    />
                  </label>
                  <p className="custom-input__error">
                    Нужно указать недостатки
                  </p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="review"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={onChangeHandler}
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
