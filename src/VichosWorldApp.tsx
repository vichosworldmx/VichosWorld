import { useEffect, useState } from "react"
import { vichosWorldProductsRepositoryApi } from "./repositories/VichosWorld-Products-Interface/VichosWorldProductsRepositoryApi"
import { Product } from "./domain/entities/products"
import { ProductCard } from "./infrastructure/presentation/components/ProductCard"
import logo from './assets/vichosworld.png';

export const VichosWorldApp = () => {
    let getProducts= true
    const [isLoading, setIsLoading] = useState(false);

    const [productToSearch, setProductToSearch] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [searchType, setSearchType] = useState('name')

    const [productsToShow, setProductsToShow] = useState<Product[]>([])

    const phoneNumber = '+525574462403'; // Reemplaza con el número de teléfono correcto
    const message = 'Me interesa algunos productos que he visto en Vicho´s World'; // Mensaje predefinido
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        if (!getProducts) {
            return
        }
        const fetchProducts = async () => {
            setIsLoading(true);
            const result = await vichosWorldProductsRepositoryApi.getProductsStock()
            if (result != null) {
                setIsLoading(false);
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
        const finded = products.filter((product) =>
            product.name.includes(value.toUpperCase()),
        );
        console.log('finded findByName', finded)
        return finded ?? products

    }
    const findByBarCode = (value: string) => {
        const finded = products.filter((product) =>
            product.barCode?.includes(value.toUpperCase()),
        );
        console.log('finded findByBarCode', finded)
        return finded ?? products
    }

    return (
        <>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">

        <img src={logo} alt="Logo de la aplicación" className="app-logo" />
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom:'8px', marginTop:'16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginBottom:'8px' }}>
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
            style={{ marginBottom: '16px', marginTop: '16px', marginRight:'16px', width: '300px'}}
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
                placeholder={`Buscar por ${searchType === 'name' ? 'nombre' : 'código de barras'}`}
            />

            <button 
            style={{
                backgroundColor: '#b5d86d', // Color de fondo
                color: 'white', // Color del texto
                border: 'none', // Sin borde
                padding: '10px 20px', // Relleno
                textAlign: 'center', // Alineación del texto
                textDecoration: 'none', // Sin decoración de texto
                display: 'inline-block', // Display
                fontSize: '16px', // Tamaño de la fuente
                margin: '4px 2px', // Margen
                cursor: 'pointer', // Cursor
                borderRadius: '4px' // Radio del borde
              }}
            
            onClick={() => {
                setProductToSearch('') 
                setProductsToShow(products)
            }}
            
            >Limpiar Busqueda</button>
            </div>
            <div>
            {isLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom:'8px', marginTop:'16px' }}><h1 className="loading">Cargando ...</h1></div> 
    ) :(
           
            <div className="card-grid">
                {productsToShow.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div> )}
 </div>
        </>
    )
}
