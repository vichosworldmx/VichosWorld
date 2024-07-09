import { Product, Size } from "../../domain/entities/products";
import { VichosWorldProduct } from "../interfaces/vichosWorld-products.response";




export class ProductMapper {

  static vichosWorldProductToEntity(vichosWorldProduct: VichosWorldProduct): Product {

    return {
      productId: vichosWorldProduct.productId,
      name: vichosWorldProduct.name,
      description: vichosWorldProduct.description,
      category: vichosWorldProduct.category,
      brands: vichosWorldProduct.brands,
      isActive: vichosWorldProduct.isActive,
      price: vichosWorldProduct.price,
      unitCost: vichosWorldProduct.unitCost,
      gender: vichosWorldProduct.gender,
      variations: vichosWorldProduct.variations.map(variation => ({
        size: variation.size as Size,
        color: variation.color,
        quantity: variation.quantity,
      })),
      images: vichosWorldProduct.images ? {
        mainImage: vichosWorldProduct.images.mainImage,
        secondaryImages: vichosWorldProduct.images.secondaryImages,
      } : undefined,
      barCode: vichosWorldProduct.barCode,
      discountPrice: vichosWorldProduct.discountPrice,
      stock: vichosWorldProduct.variations.reduce((total, variation) => total + variation.quantity, 0)
    }
  }


}