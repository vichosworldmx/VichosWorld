
export interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  brands: string;
  isActive: boolean;
  price: number;
  unitCost: number;
  gender: string;
  variations: ProductVariation[];
  images?: ProductImage;
  barCode?: string;
  discountPrice?: number;
  stock: number;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}
export interface ProductOrderSummary {
  id: string;
  barCode: string;
  price: number;
  discountPrice?: number;
  name: string;
  variation: ProductVariation[];
  unitCost: number;
  images: string[];
}

export interface ProductVariation {
  color: string;
  size: Size;
  quantity: number;
}

export interface ProductImage {
  mainImage: string | undefined,
  secondaryImages: string[],
}