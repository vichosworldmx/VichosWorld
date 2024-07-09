import { Product } from "../../../domain/entities/products";
import '../../../ProductCard.css';
interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const discountPrice = product.discountPrice ?? 0.00
    return (
        <div className="product-card">
            <h2 className="product-name">{product.barCode}</h2>
            <img
                src={product.images?.mainImage || '/path/to/default/image.png'}
                alt={product.name}
                className="product-image"
            />
            <div className="product-info">
                <h4 className="product-name">{product.name}</h4>

                <p className="product-category">{`Categoria: ${product.category}`}</p>
                <p className="product-brands">{`Marca: ${product.brands}`}</p>
                <p className="product-stock">{`Stock: ${product.stock}`}</p>
                <p className="product-price">{`Precio: $${product.price}`}</p>
                <p className="product-discountPrice">{discountPrice > 0 ? `Precio con descuento: $${discountPrice}` : ``}</p>
            </div>
        </div>
    );
};