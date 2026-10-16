import "./MainContent.css";
import { useState, useEffect, useRef } from "react";
import products from "../components/products";
import ProductCard from "../components/ProductCard";
import OrderCart from "../features/OrderCart";
import { useOrders } from "../context/OrdersContext";

export default function MainContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Products");
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const searchContainerRef = useRef(null);

    const { addOrder } = useOrders();

    // Close dropdown when clicking outside the search container
    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });

        setCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== id)
        );
    };

    const increaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All Products" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    const handleOptionClick = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsOpen(false);
    };

    return (
        <div className="mainContent">
            <div className="productsSection">
                <div
                    className="searchContainer"
                    ref={searchContainerRef}
                >
                    <div className="searchBox">
                        <input
                            type="text"
                            placeholder={category === "All Products" ? "Search Product....." : category}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            {isOpen ? "▲" : "▼"}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="dropdownMenu">
                            <button
                                type="button"
                                onClick={() => handleOptionClick("All Products")}
                            >
                                All Products
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOptionClick("Pizza")}
                            >
                                Pizza
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOptionClick("Burgers")}
                            >
                                Burgers
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOptionClick("Pasta")}
                            >
                                Pasta
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOptionClick("Desserts")}
                            >
                                Desserts
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOptionClick("Beverages")}
                            >
                                Beverages
                            </button>
                        </div>
                    )}
                </div>

                <div className="productGrid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={addToCart}
                        />
                    ))}
                </div>
            </div>

            {cartOpen && (
                <OrderCart
                    cart={cart}
                    onClose={() => setCartOpen(false)}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                    onPlaceOrder={(orderData) => {
                        console.log("Order data received:", orderData);

                        const savedOrder = addOrder(orderData);

                        console.log("Saved order:", savedOrder);

                        setCart([]);
                        setCartOpen(false);

                        return savedOrder;
                    }}
                />
            )}
        </div>
    );
}