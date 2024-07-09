import { Product } from "../../../domain/entities/products";
import '../../../ProductCard.css';
interface Props {
    product: Product;
  }
  
  export const ProductCard = ({ product }: Props) => {
    return (
      <div className="product-card">
        <img
          src={product.images?.mainImage || '/path/to/default/image.png'}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <h2 className="product-barcode">{product.barCode}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-brands">{product.brands}</p>
          <p className="product-price">{`$${product.price}`}</p>
          <p className="product-discountPrice">{`$${product.discountPrice}`}</p>
          <p className="product-stock">{`Stock: ${product.stock}`}</p>
        </div>
      </div>
    );
  };