import { useForm } from 'react-hook-form';
import ReviewStar from '../review-star';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setSuccessStatus } from '../../../store/review-data/review-data';
import { useParams } from 'react-router-dom';
import { starsValues } from '../../../const';
import { isReviewUploading } from '../../../store/selectors/reviews-selectors';
import { PostReview } from '../../../type/reviews';
import { postReviewAction } from '../../../store/review-data/review-data';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
  handleClose: () => void;
};

const ReviewForm = ({ handleClose }: Props) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isReviewLoading = useAppSelector(isReviewUploading);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostReview>({
    defaultValues: {
      cameraId: Number(id),
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 1,
    },
  });

  const setFocusOnNameInput = (el: HTMLInputElement | null) => {
    if (el) {
      el.focus();
    }
  };

  const onSubmit = (data: PostReview) => {
    data.rating = Number(data.rating);

    dispatch(postReviewAction({ review: data, cameraId: Number(id) }))
      .then(() => {
        if (!isReviewLoading) {
          handleClose();
          dispatch(setSuccessStatus(true));
        }
      })
      .catch((error) => {
        // для ошибок диспатча
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const onClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    nameInputRef.current?.focus();

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [dispatch, handleClose]);

  const ratingRegister = register('rating', {
    required: 'Rating is required',
  });

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
            >
              <div className="form-review__rate">
                <fieldset
                  className={`rate form-review__item ${
                    errors.rating?.message ? 'is-invalid' : ''
                  }`}
                >
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
                          register={ratingRegister}
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
                <div
                  className={`custom-input form-review__item ${
                    errors.userName?.message ? 'is-invalid' : ''
                  }`}
                >
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      ref={(el) => {
                        setFocusOnNameInput(el);
                        register('userName', {
                          required: 'Нужно указать имя',
                        }).ref(el);
                      }}
                      type="text"
                      placeholder="Введите ваше имя"
                    />
                  </label>
                  <p className="custom-input__error">
                    {errors.userName?.message}
                  </p>
                </div>
                <div
                  className={`custom-input form-review__item ${
                    errors.advantage?.message ? 'is-invalid' : ''
                  }`}
                >
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('advantage', {
                        required: 'Нужно указать достоинства',
                      })}
                      type="text"
                      placeholder="Основные преимущества товара"
                    />
                  </label>
                  <p className="custom-input__error">
                    {errors.advantage?.message}
                  </p>
                </div>
                <div
                  className={`custom-input form-review__item ${
                    errors.disadvantage?.message ? 'is-invalid' : ''
                  }`}
                >
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('disadvantage', {
                        required: 'Нужно указать недостатки',
                      })}
                      type="text"
                      placeholder="Главные недостатки товара"
                    />
                  </label>
                  <p className="custom-input__error">
                    {errors.disadvantage?.message}
                  </p>
                </div>
                <div
                  className={`custom-textarea form-review__item ${
                    errors.review?.message ? 'is-invalid' : ''
                  }`}
                >
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      {...register('review', {
                        required: 'Нужно добавить комментарий',
                        minLength: {
                          value: 2,
                          message: 'Минимальная длина: 2 cимвoлa',
                        },
                        maxLength: {
                          value: 160,
                          message: 'Максимальная длина: 160 символов',
                        },
                      })}
                      placeholder="Поделитесь своим опытом покупки"
                    />
                  </label>
                  <div className="custom-textarea__error">
                    {errors.review?.message}
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
            onClick={onClose}
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
