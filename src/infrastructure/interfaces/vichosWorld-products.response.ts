

export interface ProductsResponse {
  statusCode: number;
  body: string
}
// export interface ProductsResponse {
//   statusCode: number;
//   body: {
//     data: string;
//     meta: string;
//   }
// }
export interface ProductResponse {
  statusCode: number;
  body: string
}

export interface ProductVariationPrimitives {
  color: string,
  size: string,
  quantity: number,
}

export interface ProductImagePrimitives {
   mainImage: string | undefined,
   secondaryImages: string[],
}
export interface ManagerCredentialsPrimitives {
   id: string,
   fullName: string,
   email: string,
}
export interface VichosWorldProduct {
      productId: string;
      name: string;
      description: string;
      category: string;
      brands: string;
      isActive: boolean;
      price: number;
      unitCost: number;
      gender: string;
      variations: ProductVariationPrimitives[];
      images?: ProductImagePrimitives;
      barCode?: string;
      discountPrice?: number;
      createdAt?: number;
      updatedAt?: number;
      updatedBy?: ManagerCredentialsPrimitives;
  }
// export interface VichosWorldProduct {
//     id:          string;
//     title:       string;
//     price:       number;
//     description: string;
//     slug:        string;
//     stock:       number;
//     sizes:       Size[];
//     gender:      Gender;
//     tags:        string[];
//     images:      string[];
//     user:        VichosWorldUser;
//   }
  
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
  
  
  export interface VichosWorldUser {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
  }