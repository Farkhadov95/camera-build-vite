import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  isLoadingSelector,
  promoItemsSelector,
} from '../../store/selectors/catalog-selectors';
import { useAppSelector } from '../../hooks';
import BannerItem from './banner-item';

const Banner = () => {
  const promoItems = useAppSelector(promoItemsSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
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
