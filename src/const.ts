export enum Tabs {
    SPECS = 'specs',
    DESCRIPTION = 'description',
}

export enum NameSpace {
  Products = 'PRODUCTS',
  Reviews = 'REVIEWS',
}

export enum SortType {
  none = 'none',
  price = 'price',
  reviewCount = 'reviewCount',
}

export enum SortOrder {
  none = 'none',
  ascending = 'ascending',
  descending = 'descending',
}

export const starsValues = [
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

export enum ErrorMessages {
  PROMO_LOAD = 'Ошибка загрузки промо',
  CATALOG_ITEMS_LOAD = 'Ошибка загрузки каталога',
  PRODUCT_LOAD = 'Ошибка загрузки товара',
  SIMILAR_ITEMS_LOAD = 'Ошибка загрузки похожих товаров',
  REVIEWS_LOAD = 'Ошибка загрузки отзывов',
  REVIEW_UPLOAD = 'Ошибка отправки отзыва',
}

export const PAGES_LIST_SIZE = 3;
export const ITEMS_PER_PAGE = 9;
