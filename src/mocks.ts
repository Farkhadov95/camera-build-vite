import { Category, Level, Type } from './type/catalog';

export const catalogItemMock = {
  id: 1,
  name: 'Mock Retrocamera',
  vendorCode: 'DA4IU67AD5',
  type: Type.collection,
  category: Category.videocamera,
  description: 'Немецкий концерн BRW разработал видеокамеру Mock Retrocamera в начале 80-х годов.',
  previewImg: 'img/content/das-auge.jpg',
  level: Level.nonProfessional,
  price: 12345,
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  rating: 4,
  reviewCount: 45
};
