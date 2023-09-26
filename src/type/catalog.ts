export enum Category {
    videocamera = 'Видеокамера',
    photocamera = 'Фотоаппарат',
}

export enum Type {
    collection = 'Коллекционная',
    digital = 'Цифровая',
    film = 'Плёночная',
    snapshot = 'Моментальная',
}

export enum Level {
    zero = 'Нулевой',
    nonProfessional = 'Любительский',
    professional = 'Профессиональный',
}

export type CatalogItem = {
    id: number;
    name: string;
    vendorCode: string;
    type: Type;
    category: Category;
    description: string;
    level: Level;
    price: number;
    rating: number;
    reviewCount: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}

export type CatalogItems = CatalogItem[];

export type PromoItem = {
    id: number;
    name: string;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}

export type PromoItems = PromoItem[];


export type CatalogData = {
    catalog: CatalogItems;
    product: CatalogItem | null;
    reviews: Reviews;
    similarProducts: CatalogItems;
    promos: PromoItems;
    isDataLoading: boolean;
    isReviewLoading: boolean;
    isPostReviewSuccess: boolean;
}

export type Review = {
    id: string;
    createAt: string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}

export type PostReview = {
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}


export type Reviews = Review[];
