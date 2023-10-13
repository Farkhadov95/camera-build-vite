import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../hooks';
import { setSuccessStatus } from '../../../store/review-data/review-data';

const ReviewSuccess = () => {
  const dispatch = useAppDispatch();
  const returnBtnRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    // Dispatch an action to set successStatus to false
    dispatch(setSuccessStatus(false));
  }, [dispatch]);

  useEffect(() => {
    returnBtnRef.current?.focus();

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClose}></div>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg
            className="modal__icon"
            width="80"
            height="78"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              ref={returnBtnRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => handleClose()}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => handleClose()}
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

export default ReviewSuccess;
