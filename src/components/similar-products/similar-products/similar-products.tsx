import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { similarProductsSelector } from '../../../store/selectors/catalog-selectors';
import { useAppSelector } from '../../../hooks';
import SimilarItem from '../similar-item/similar-item';

const SimilarProducts = () => {
  const similarItems = useAppSelector(similarProductsSelector);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on('slideChange', () => {
        setIsPrevDisabled(swiperRef.current?.isBeginning || false);
        setIsNextDisabled(swiperRef.current?.isEnd || false);
      });
    }
  }, []);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={() => {
                setIsPrevDisabled(swiperRef.current?.isBeginning || false);
                setIsNextDisabled(swiperRef.current?.isEnd || false);
              }}
              slidesPerView={3}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {similarItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <SimilarItem key={item.id} item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={isPrevDisabled}
            onClick={() =>
              swiperRef.current?.slidePrev && swiperRef.current.slidePrev()}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={isNextDisabled}
            onClick={() =>
              swiperRef.current?.slideNext && swiperRef.current.slideNext()}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
