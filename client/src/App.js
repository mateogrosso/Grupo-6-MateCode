import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import { fetchProductos } from './services/productsService'; 
import './styles/main.css'; 


const VIEW = {
    CATALOG: 'catalog',
    DETAIL: 'detail',
    CONTACT: 'contact',
};

function App() {
    const [productos, setProductos] = useState([]);      
    const [carrito, setCarrito] = useState([]);          
    const [currentView, setCurrentView] = useState(VIEW.CATALOG); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductos(); 
                setProductos(data);
                setLoading(false);
            } catch (err) {
                setError('Error al conectar con la API.');
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleAddToCart = (product, quantity = 1) => {
        setCarrito(prevCarrito => {
            const exists = prevCarrito.find(item => item.id === product.id);
            if (exists) {
                return prevCarrito.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + quantity } : item
                );
            } else {
                return [...prevCarrito, { ...product, cantidad: quantity }];
            }
        });
        alert(`${quantity} x ${product.nombre} añadido al carrito!`);
    };

    const handleChangeView = (view, product = null) => {
        setCurrentView(view);
        setSelectedProduct(product); 
    };

    const renderContent = () => {
        if (loading) return <div className="message loading">Cargando catálogo...</div>;
        if (error) return <div className="message error">{error}</div>;

        switch (currentView) {
            case VIEW.DETAIL:
                return selectedProduct 
                    ? <ProductDetail 
                        product={selectedProduct} 
                        onAddToCart={handleAddToCart}
                        onGoBack={() => handleChangeView(VIEW.CATALOG)} 
                      />
                    : handleChangeView(VIEW.CATALOG); 
            
            case VIEW.CONTACT:
                return <ContactForm />;

            case VIEW.CATALOG:
            default:
                return <ProductList 
                    productos={productos} 
                    onSelectProduct={handleChangeView} 
                />;
        }
    };

    return (
        <div className="App">
            <Navbar 
                cartCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
                onNavigate={handleChangeView}
            />
            
            <main className="container" style={{ padding: '2rem' }}>
                {renderContent()}
            </main>

            <footer>
                <ul className="footer-lista">
                    <li><a href="#whatsapp" onClick={(e) => e.preventDefault()}>Whatsapp</a></li>
                    <li><a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a></li>
                    <li><a href="#twitter" onClick={(e) => e.preventDefault()}>Twitter</a></li>
                    <li><a href="#email" onClick={(e) => e.preventDefault()}>Email</a></li>
                </ul>
                <p className="footer-copyright">
                    © Todos los derechos reservados - {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}

export default App;