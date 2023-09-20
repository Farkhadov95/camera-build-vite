import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { promoItemsSelector } from '../../selectors/catalog-selectors';
import { useAppSelector } from '../../type';
import BannerItem from './banner-item';

const Banner = () => {
  const promoItems = useAppSelector(promoItemsSelector);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
      pagination={{
        clickable: true,
      }}
    >
      {promoItems.map((item) => (
        <SwiperSlide key={item.id}>
          <BannerItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
