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
    similarProducts: CatalogItems;
    promos: PromoItems;
    isDataLoading: boolean;
}
