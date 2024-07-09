import { useEffect, useState } from "react"
import { vichosWorldProductsRepositoryApi } from "./repositories/VichosWorld-Products-Interface/VichosWorldProductsRepositoryApi"
import { Product } from "./domain/entities/products"
import { ProductCard } from "./infrastructure/presentation/components/ProductCard"


export const VichosWorldApp = () => {
    let getProducts= true

    const [productToSearch, setProductToSearch] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [searchType, setSearchType] = useState('name')

    const [productsToShow, setProductsToShow] = useState<Product[]>([])

    useEffect(() => {
        if (!getProducts) {
            return
        }
        const fetchProducts = async () => {
            const result = await vichosWorldProductsRepositoryApi.getProductsStock()
            if (result != null) {
                console.log('result fetched', result)
                result.sort((a, b) => a.name.localeCompare(b.name));
                const availableProducts = result.filter(product => product.isActive);
                setProductsToShow(availableProducts)
                setProducts(availableProducts)
                getProducts = false
            }

        }

        fetchProducts()
    }, [])

    const findByName = (value: string) => {
        return products.filter((product) =>
            product.name.includes(value),
        );

    }
    const findByBarCode = (value: string) => {
        return products.filter((product) =>
            product.barCode?.includes(value),
        );
    }

    return (
        <>
            <h1>Vicho's World</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                <div>
                    <input
                        type="radio"
                        value="name"
                        checked={searchType === 'name'}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                    <label>Nombre</label>
                </div>
                <div>
                    <input
                        type="radio"
                        value="barcode"
                        checked={searchType === 'barcode'}
                        onChange={(e) => setSearchType(e.target.value)}
                    />
                    <label>Código de barras</label>
                </div>
            </div>

            <input
                type="text"
                value={productToSearch}
                onChange={(e) => {
                    setProductToSearch(e.target.value)
                    if (searchType === 'name') {
                        setProductsToShow(findByName(e.target.value))
                    }
                    if (searchType === 'barcode') {
                        setProductsToShow(findByBarCode(e.target.value))
                    }

                }}
                placeholder="Nombre"
            />

            <button onClick={() => {
                setProductsToShow(products)
            }}>Limpiar Busqueda</button>
            <div className="card-grid">
                {productsToShow.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>

        </>
    )
}
