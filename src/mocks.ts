import { Category, Level, Type } from './type/catalog';

export const catalogItemMock = {
  id: 1,
  name: 'Mock Retrocamera',
  vendorCode: 'DA4IU67AD5',
  type: Type.collection,
  category: Category.videocamera,
  description: 'Description 1',
  previewImg: 'img/content/das-auge.jpg',
  level: Level.nonProfessional,
  price: 12345,
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
  rating: 4,
  reviewCount: 45
};

export const catalogItemsMock = [
  {
    id: 1,
    name: 'Mock Retrocamera 1',
    vendorCode: 'DA4IU67AD5',
    type: Type.collection,
    category: Category.videocamera,
    description: 'Description 1',
    previewImg: 'img/content/das-auge.jpg',
    level: Level.nonProfessional,
    price: 12345,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 4,
    reviewCount: 45
  },
  {
    id: 2,
    name: 'Mock Retrocamera 2',
    vendorCode: 'DA4IU67AD5',
    type: Type.collection,
    category: Category.videocamera,
    description: 'Description 2',
    previewImg: 'img/content/das-auge.jpg',
    level: Level.nonProfessional,
    price: 12345,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 4,
    reviewCount: 45
  },
  {
    id: 3,
    name: 'Mock Retrocamera 3',
    vendorCode: 'DA4IU67AD5',
    type: Type.collection,
    category: Category.videocamera,
    description: 'Description 3',
    previewImg: 'img/content/das-auge.jpg',
    level: Level.nonProfessional,
    price: 12345,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 4,
    reviewCount: 45
  },
  {
    id: 4,
    name: 'Mock Retrocamera 4',
    vendorCode: 'DA4IU67AD5',
    type: Type.collection,
    category: Category.videocamera,
    description: 'Description 4',
    previewImg: 'img/content/das-auge.jpg',
    level: Level.nonProfessional,
    price: 12345,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 4,
    reviewCount: 45
  }
];

export const reviewsMocks = [
  {
    id: '8b2219e9-b1ee-4e62-beda-e90a8966b55e1',
    userName: 'Mock User',
    advantage: 'Mock 1 advantage',
    disadvantage: 'Mock 1 disadvantage',
    review: 'Mock Камера 1',
    rating: 1,
    createAt: '2023-09-03T12:51:44.772Z',
    cameraId: 1
  },
  {
    id: '8b2219e9-b1ee-4e62-beda-e90a8966b55e2',
    userName: 'Mock User',
    advantage: 'Настройки, внешний вид, лёгкость',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Mock Камера 2',
    rating: 2,
    createAt: '2023-09-03T12:51:44.772Z',
    cameraId: 2
  },
  {
    id: '8b2219e9-b1ee-4e62-beda-e90a8966b55e3',
    userName: 'Mock User',
    advantage: 'Настройки, внешний вид, лёгкость',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Mock Камера 3',
    rating: 3,
    createAt: '2023-09-03T12:51:44.772Z',
    cameraId: 3
  },
  {
    id: '8b2219e9-b1ee-4e62-beda-e90a8966b55e4',
    userName: 'Mock User',
    advantage: 'Настройки, внешний вид, лёгкость',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Mock Камера 4',
    rating: 4,
    createAt: '2023-09-03T12:51:44.772Z',
    cameraId: 4
  },
  {
    id: '8b2219e9-b1ee-4e62-beda-e90a8966b55e5',
    userName: 'Mock User',
    advantage: 'Настройки, внешний вид, лёгкость',
    disadvantage: 'Странные звуки при переключении режимов',
    review: 'Mock Камера 5',
    rating: 5,
    createAt: '2023-09-03T12:51:44.772Z',
    cameraId: 5
  },
];
