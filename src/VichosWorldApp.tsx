import { useEffect, useState } from "react"
import { vichosWorldProductsRepositoryApi } from "./repositories/VichosWorld-Products-Interface/VichosWorldProductsRepositoryApi"
import { Product } from "./domain/entities/products"
import { ProductCard } from "./infrastructure/presentation/components/ProductCard"
import logo from './assets/vichosworld.png';
import whastapp from './assets/wa.png';
import facebook from './assets/fb.png';

export const VichosWorldApp = () => {
    let getProducts = true
    const [isLoading, setIsLoading] = useState(false);

    const [productToSearch, setProductToSearch] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [searchType, setSearchType] = useState('name')

    const [productsToShow, setProductsToShow] = useState<Product[]>([])

    const phoneNumber = '+525532261358'; 
    const message = 'Me interesa algunos productos que he visto en Vicho´s World'; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const facebookURL = `https://www.facebook.com/vichosworld`;

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
            <img  style={{
    boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.75)', 
    borderRadius: '35%', 
  }} src={logo} alt="Logo de la aplicación" className="app-logo" />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '8px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginBottom: '8px' }}>
                    <div style={{
                        backgroundColor: '#b5d86d', 
                        color: 'white', 
                        border: 'none',  
                        padding: '10px 20px', 
                        textAlign: 'center', 
                        textDecoration: 'none', 
                        display: 'inline-block', 
                        fontSize: '16px', 
                        margin: '4px 2px', 
                        cursor: 'pointer', 
                        borderRadius: '4px' 
                    }}>
                        <input
                            type="radio"
                            value="name"
                            checked={searchType === 'name'}
                            onChange={(e) => setSearchType(e.target.value)}
                        />
                        <label style={{ background: '#b5d86d' }}>Nombre</label>
                    </div>
                    <div style={{
                         backgroundColor: '#b5d86d', 
                         color: 'white', 
                         border: 'none',  
                         padding: '10px 20px', 
                         textAlign: 'center', 
                         textDecoration: 'none', 
                         display: 'inline-block', 
                         fontSize: '16px', 
                         margin: '4px 2px', 
                         cursor: 'pointer', 
                         borderRadius: '4px' 
                    }}>
                        <input
                            type="radio"
                            value="barcode"
                            checked={searchType === 'barcode'}
                            onChange={(e) => setSearchType(e.target.value)}
                        />
                        <label style={{ background: '#b5d86d' }}>Código de barras</label>
                    </div>
                </div>

                <input
                    style={{ marginBottom: '16px', marginTop: '16px', marginRight: '16px', width: '300px' }}
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
                        backgroundColor: '#b5d86d', 
                        color: 'white', 
                        border: 'none',  
                        padding: '10px 20px', 
                        textAlign: 'center', 
                        textDecoration: 'none', 
                        display: 'inline-block', 
                        fontSize: '16px', 
                        margin: '4px 2px', 
                        cursor: 'pointer', 
                        borderRadius: '4px' 
                    }}

                    onClick={() => {
                        setProductToSearch('')
                        setProductsToShow(products)
                    }}

                >Limpiar Busqueda</button>
            </div>
            <div>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '8px', marginTop: '16px' }}><h1 className="loading">Cargando ...</h1></div>
                ) : (

                    <div className="card-grid">
                        {productsToShow.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>)}
            </div>
            <button
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                    backgroundColor: '#b5d86d', 
                    color: 'white', 

                    border: '3px solid #ead294',
                    padding: '10px 20px', 
                    textAlign: 'center', 
                    textDecoration: 'none', 
                    display: 'inline-block', 
                    fontSize: '16px', 
                    margin: '4px 2px', 
                    cursor: 'pointer', 
                    borderRadius: '4px' 

                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                Inicio
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <img
                    src={whastapp}
                    alt="WhatsApp Image"
                    style={{
                        position: 'fixed',
                        top: '35px',
                        right: '20px',
                        zIndex: 1000,
                        height: '7%',
                        cursor: 'pointer',

                            boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)', 
                            borderRadius: '50%', 

                    }}

                />
            </a>
            <a href={facebookURL} target="_blank" rel="noopener noreferrer">
                <img
                    src={facebook}
                    alt="FaceBook Image"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        zIndex: 1000,
                        height: '7%',
                        cursor: 'pointer',

                            boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.2)', 
                            borderRadius: '50%', 

                    }}

                />
            </a>
        </>
    )
}
