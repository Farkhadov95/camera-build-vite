export type CatalogItem = {
    id: number;
    name: string;
    vendorCode: string;
    type: 'Коллекционная'|'Моментальная'|'Цифровая'|'Плёночная';
    category: 'Видеокамера'|'Фотоаппарат';
    description: string;
    level: 'Нулевой'|'Любительский'|'Профессиональный';
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
