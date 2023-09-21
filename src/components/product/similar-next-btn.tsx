import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      className="slider-controls slider-controls--next"
      type="button"
      aria-label="Следующий слайд"
      onClick={() => swiper.slideNext()}
    >
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
  );
}
