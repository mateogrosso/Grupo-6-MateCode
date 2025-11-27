import React, { createContext, useState, useEffect } from 'react';

// Creación del contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Inicializamos el carrito leyendo del localStorage si existe
    const [cartItems, setCartItems] = useState(() => {
        try {
            const itemsEnStorage = localStorage.getItem('cartItems');
            return itemsEnStorage ? JSON.parse(itemsEnStorage) : [];
        } catch (error) {
            return [];
        }
    });

    // Guardamos en localStorage cada vez que el carrito cambie
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Función para agregar ítems
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Buscamos si el ítem ya está en el carrito
            const itemExists = prevItems.find((item) => item._id === product._id);

            if (itemExists) {
                // Si existe, aumentamos su cantidad
                return prevItems.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, lo agregamos con cantidad base 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Función para eliminar un ítem del carrito
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    // Función para limpiar todo (ej: después de comprar)
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculamos el total de productos para el badge del navbar
    const getCartCount = () => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    };

    // Calculamos el precio total
    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartCount,
                getCartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};