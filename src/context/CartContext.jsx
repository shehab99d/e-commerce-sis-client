import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Safely read cart from localStorage (guards against corrupted JSON)
const loadCartFromStorage = () => {
    try {
        const stored = localStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    // ✅ Lazy initializer — reads localStorage once on mount, no flicker
    const [cartItems, setCartItems] = useState(() => loadCartFromStorage());

    // ✅ Keep localStorage in sync whenever cartItems changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item._id === product._id);
            if (exists) return prev; // prevent duplicate
            return [...prev, product];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item._id !== productId));
    };

    // Useful for after checkout
    const clearCart = () => setCartItems([]);

    const isInCart = (productId) => cartItems.some((item) => item._id === productId);

    const cartCount = cartItems.length;

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);