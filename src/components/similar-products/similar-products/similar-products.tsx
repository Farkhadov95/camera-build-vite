import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { similarProductsSelector } from '../../../store/selectors/catalog-selectors';
import { useAppSelector } from '../../../hooks';
import SimilarItem from '../similar-item/similar-item';
import 'swiper/css';

const SimilarProducts = () => {
  const similarItems = useAppSelector(similarProductsSelector);
  const swiperRef = useRef<SwiperType>();
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
              modules={[Navigation]}
              navigation={{
                nextEl: '.slider-controls--next',
                prevEl: '.slider-controls--prev',
              }}
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
                  <SimilarItem key={item.id} product={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="slider-controls-buttons slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={isPrevDisabled}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls-buttons slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={isNextDisabled}
            onClick={() => swiperRef.current?.slideNext()}
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
