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

export type BasketItem = {
    quantity: number;
    product: CatalogItem;
}

export type BasketItems = BasketItem[];


export type CatalogData = {
    catalog: CatalogItems;
    visibleCatalog: CatalogItems;
    product: CatalogItem | null;
    basket: BasketItems;
    similarProducts: CatalogItems;
    promos: PromoItems;
    isDataLoading: boolean;
    isAddedToBasket: boolean;
    productToAdd: CatalogItem | null;
}

export type Filters = {
    price: string;
    priceUp: string;
    photocamera: boolean;
    videocamera: boolean;
    digital: boolean;
    film: boolean;
    snapshot: boolean;
    collection: boolean;
    zero: boolean;
    nonProfessional: boolean;
    professional: boolean;
}
